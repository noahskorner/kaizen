import { ApiResponse, Errors, isArrayEqual } from '@kaizen/core';
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
  SyncAccountsCommand,
  SyncAccountsResponse
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
  ): Promise<ApiResponse<SyncAccountsResponse>> {
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

    const response = this._buildReponse(syncAccountsResponses);
    return this.success(response);
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
    if (!isArrayEqual(command.institutionIds, institutionRecordIds)) {
      return this.failure(Errors.SYNC_ACCOUNTS_INSTITUTION_NOT_FOUND);
    }

    return this.success(institutionRecords);
  }

  private async _sync(
    institutionId: string,
    accessToken: string
  ): Promise<InternalSyncAccountsResponse> {
    const externalAccountsResponse =
      await this._financialProvider.getExternalAccounts(accessToken);
    if (externalAccountsResponse.type == 'FAILURE') {
      return {
        institutionId,
        response: this.failures(externalAccountsResponse.errors)
      };
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

    const response: InternalSyncAccountsResponse = {
      institutionId,
      response: this.success(accountRecords)
    };
    return response;
  }

  private _buildReponse(
    syncAccountsResponses: InternalSyncAccountsResponse[]
  ): SyncAccountsResponse {
    const initialValue: SyncAccountsResponse = {
      succeeded: new Map<string, Account[]>(),
      failed: []
    };

    return syncAccountsResponses.reduce((prev, curr) => {
      if (curr.response.type === 'FAILURE') {
        return {
          ...prev,
          failed: [...prev.failed, curr.institutionId]
        };
      }

      return {
        ...prev,
        succeeded: prev.succeeded.set(
          curr.institutionId,
          curr.response.data.map((accountRecord) =>
            AccountAdapter.toAccount(accountRecord)
          )
        )
      };
    }, initialValue);
  }
}

interface InternalSyncAccountsResponse {
  institutionId: string;
  response: ApiResponse<AccountRecord[]>;
}
