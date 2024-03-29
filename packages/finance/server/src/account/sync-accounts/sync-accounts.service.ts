import { ErrorCode, ServiceResponse } from '@kaizen/core';
import { Service } from '@kaizen/core-server';
import {
  AccountAdapter,
  AccountRecord,
  AccountRecordAdapter,
  FindInstitutionsQuery,
  GetAccountByExternalIdQuery,
  IFinancialProvider,
  IFindInstitutionsRepository,
  IGetAccountRepository,
  ISyncAccountsRepository,
  ISyncAccountsService,
  ISyncTransactionsService,
  InstitutionAdapter,
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
  ): Promise<ServiceResponse<SyncAccountsResponse>> {
    const findInstitutionsResponse =
      await this._findInstitutionRecords(command);
    if (findInstitutionsResponse.type == 'FAILURE') {
      return findInstitutionsResponse;
    }

    const institutionRecords = findInstitutionsResponse.data;
    const syncAccountsResponses = await Promise.all(
      institutionRecords.map((institutionRecord) => {
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

    const response = this._buildResponse(
      institutionRecords,
      syncAccountsResponses
    );
    return this.success(response);
  }

  private async _findInstitutionRecords(
    command: SyncAccountsCommand
  ): Promise<ServiceResponse<InstitutionRecord[]>> {
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
    const missingInstitutionIds = command.institutionIds.filter(
      (institutionId) => !institutionRecordIds.includes(institutionId)
    );
    if (missingInstitutionIds.length > 0) {
      return this.failure({
        code: ErrorCode.SYNC_ACCOUNTS_INSTITUTION_NOT_FOUND,
        params: {
          instiutionIds: missingInstitutionIds
        }
      });
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
          externalAccountId: externalAccount.externalAccountId
        };
        const existingAccountRecord =
          await this._getAccountRepository.getByExternalId(getAccountQuery);

        if (existingAccountRecord != null) {
          const updateAccountQuery = AccountRecordAdapter.toUpdateAccountQuery(
            existingAccountRecord.institutionId,
            existingAccountRecord.id,
            externalAccount
          );
          return this._syncAccountsRepository.update(updateAccountQuery);
        }

        const createAccountQuery = AccountRecordAdapter.toCreateAccountQuery(
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
    institutionRecords: InstitutionRecord[],
    syncAccountsResponses: InternalSyncAccountsResponse[]
  ): SyncAccountsResponse {
    const initialValue: SyncAccountsResponse = {
      succeeded: [],
      failed: []
    };

    return syncAccountsResponses.reduce((prev, curr) => {
      if (curr.response.type === 'FAILURE') {
        return {
          ...prev,
          failed: [...prev.failed, curr.institutionId]
        };
      }

      const institutionRecord = institutionRecords.find(
        (institutionRecord) => institutionRecord.id === curr.institutionId
      );
      if (institutionRecord == null) {
        throw new Error(
          'Institution record not found. This means we fucked up somehow.'
        );
      }
      const institution = InstitutionAdapter.toInstitution(
        institutionRecord,
        curr.response.data.map(AccountAdapter.toAccount)
      );

      return {
        ...prev,
        succeeded: [...prev.succeeded, institution]
      };
    }, initialValue);
  }
}

interface InternalSyncAccountsResponse {
  institutionId: string;
  response: ServiceResponse<AccountRecord[]>;
}
