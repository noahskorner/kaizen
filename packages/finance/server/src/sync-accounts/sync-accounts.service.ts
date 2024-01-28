import { ApiResponse, Errors } from '@kaizen/core';
import { Service } from '@kaizen/core-server';
import {
  Account,
  AccountAdapter,
  AccountRecord,
  ExternalAccountAdapter,
  FindInstitutionsQuery,
  GetAccountByExternalIdQuery,
  IFinancialProvider,
  IFindInstitutionsRepository,
  IGetAccountRepository,
  ISyncAccountsRepository,
  ISyncAccountsService,
  InstitutionRecord,
  SyncAccountsCommand
} from '@kaizen/finance';

export class SyncAccountsService
  extends Service
  implements ISyncAccountsService
{
  constructor(
    private readonly _financialProvider: IFinancialProvider,
    private readonly _findInstitutionsRepository: IFindInstitutionsRepository,
    private readonly _getAccountRepository: IGetAccountRepository,
    private readonly _syncAccountsRepository: ISyncAccountsRepository
  ) {
    super();
  }

  public async sync(
    command: SyncAccountsCommand
  ): Promise<ApiResponse<Account[]>> {
    const findInstitutionsResponse =
      await this._findInstitutionRecords(command);
    if (findInstitutionsResponse.type == 'FAILURE') {
      return this.failures(findInstitutionsResponse.errors);
    }

    const syncAccountsResponses = await Promise.all(
      findInstitutionsResponse.data.map((institutionRecord) => {
        return this._sync(
          institutionRecord.id,
          institutionRecord.plaidAccessToken
        );
      })
    );
    // TODO: Ignoring the failures for now
    const accounts = syncAccountsResponses
      .reduce((prev, curr) => {
        if (curr.type == 'FAILURE') return prev;

        return [...prev, ...curr.data];
      }, new Array<AccountRecord>())
      .map(AccountAdapter.toAccount);

    return this.success(accounts);
  }

  private async _findInstitutionRecords(
    command: SyncAccountsCommand
  ): Promise<ApiResponse<InstitutionRecord[]>> {
    const query: FindInstitutionsQuery = {
      userId: command.userId,
      institutionIds: command.institutionIds
    };
    const institutionRecords =
      await this._findInstitutionsRepository.find(query);

    if (command.institutionIds == null || command.institutionIds.length === 0) {
      return this.success(institutionRecords);
    }

    const institutionRecordIds = institutionRecords.map(
      (institutionRecord) => institutionRecord.id
    );
    if (
      command.institutionIds.some(
        (institutionId) => !institutionRecordIds.includes(institutionId)
      )
    ) {
      return this.failure(Errors.SYNC_ACCOUNTS_INSTITUTION_NOT_FOUND);
    }

    return this.success(institutionRecords);
  }

  private async _sync(
    institutionId: string,
    accessToken: string
  ): Promise<ApiResponse<AccountRecord[]>> {
    const externalAccountsResponse =
      await this._financialProvider.getExternalAccounts(accessToken);
    if (externalAccountsResponse.type == 'FAILURE') {
      return this.failures(externalAccountsResponse.errors);
    }

    const accountRecords = await Promise.all(
      externalAccountsResponse.data.map(async (externalAccount) => {
        const getAccountQuery: GetAccountByExternalIdQuery = {
          externalAccountId: externalAccount.id
        };
        const existingAccountRecord =
          await this._getAccountRepository.getByExternalId(getAccountQuery);

        if (existingAccountRecord != null) {
          const updateAccountQuery =
            ExternalAccountAdapter.toUpdateAccountQuery(
              existingAccountRecord.institutionId,
              existingAccountRecord.id,
              externalAccount
            );
          return this._syncAccountsRepository.update(updateAccountQuery);
        }

        const createAccountQuery = ExternalAccountAdapter.toCreateAccountQuery(
          institutionId,
          externalAccount
        );
        return this._syncAccountsRepository.create(createAccountQuery);
      })
    );

    return this.success(accountRecords);
  }
}
