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
  ISyncTransactionsService,
  InstitutionRecord,
  SyncAccountsCommand,
  SyncAccountsResponse,
  SyncTransactionsCommand
} from '@kaizen/finance';

export class SyncAccountsService
  extends Service
  implements ISyncAccountsService
{
  constructor(
    private readonly _financialProvider: IFinancialProvider,
    private readonly _findInstitutionsRepository: IFindInstitutionsRepository,
    private readonly _getAccountRepository: IGetAccountRepository,
    private readonly _syncAccountsRepository: ISyncAccountsRepository,
    private readonly _syncTransactionsService: ISyncTransactionsService
  ) {
    super();
  }

  public async sync(
    command: SyncAccountsCommand
  ): Promise<ApiResponse<SyncAccountsResponse>> {
    const findInstitutionsResponse =
      await this._findInstitutionRecords(command);
    if (findInstitutionsResponse.type == 'FAILURE') {
      return findInstitutionsResponse;
    }

    const syncAccountsResponses = await Promise.all(
      findInstitutionsResponse.data.map((institutionRecord) => {
        return this._sync(
          institutionRecord.id,
          institutionRecord.plaidAccessToken
        );
      })
    );

    // TODO: Don't await this. We should queue up a job and emit events to the client.
    // This works for now though. Let's not do anything with the response just yet.
    const syncTransactionsCommand: SyncTransactionsCommand = {
      userId: command.userId,
      institutionIds: command.institutionIds
    };
    await this._syncTransactionsService.sync(syncTransactionsCommand);

    const response = this._buildResponse(syncAccountsResponses);
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
        response: externalAccountsResponse
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

  private _buildResponse(
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
