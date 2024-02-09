import { ErrorCode, ServiceResponse, isArrayEqual } from '@kaizen/core';
import { Service } from '@kaizen/core-server';
import {
  CreateTransactionQuery,
  ExternalTransaction,
  FindAccountsByExternalIdsQuery,
  FindInstitutionsQuery,
  IFinancialProvider,
  IFindAccountsRepostiory,
  IFindInstitutionsRepository,
  ISyncTransactionsRepository,
  ISyncTransactionsService,
  Institution,
  InstitutionAdapter,
  InstitutionRecord,
  SyncExternalTransactionsResponse,
  SyncTransactionsCommand,
  SyncTransactionsResponse,
  Transaction,
  TransactionAdapter
} from '@kaizen/finance';

export class SyncTransactionsService
  extends Service
  implements ISyncTransactionsService
{
  constructor(
    private readonly _findInstitutionsRepository: IFindInstitutionsRepository,
    private readonly _findAccountsRepository: IFindAccountsRepostiory,
    private readonly _financialProvider: IFinancialProvider,
    private readonly _syncTransactionsRepository: ISyncTransactionsRepository
  ) {
    super();
  }

  public async sync(
    command: SyncTransactionsCommand
  ): Promise<ServiceResponse<SyncTransactionsResponse>> {
    const findInstitutionResponse = await this._findInstitutions(command);
    if (findInstitutionResponse.type === 'FAILURE') {
      return findInstitutionResponse;
    }

    const syncTransactionResponses = await Promise.all(
      findInstitutionResponse.data.map(async (institutionRecord) => {
        return this._sync({
          institutionId: institutionRecord.id,
          plaidAccessToken: institutionRecord.plaidAccessToken,
          plaidCursor: institutionRecord.plaidCursor
        });
      })
    );

    const response = this._buildResponse(syncTransactionResponses);
    return this.success(response);
  }

  private async _findInstitutions(
    command: SyncTransactionsCommand
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
        code: ErrorCode.SYNC_TRANSACTIONS_INSTITUTIONS_NOT_FOUND,
        params: { institutionIds: missingInstitutionIds }
      });
    }
    return this.success(institutionRecords);
  }

  private async _sync({
    institutionId,
    plaidAccessToken,
    plaidCursor
  }: InternalSyncTransactionsCommand): Promise<InternalSyncTransactionsResponse> {
    // Initialize our pointers
    let hasMore = true;
    let cursor = plaidCursor;
    let institution: Institution | null = null;
    let created: Transaction[] = [];
    let updated: Transaction[] = [];
    let deleted: Transaction[] = [];

    while (hasMore) {
      // Get a batch from the financial provider
      const syncExternalTransactionsResponse =
        await this._financialProvider.syncExternalTransactions(
          plaidAccessToken,
          cursor
        );
      if (syncExternalTransactionsResponse.type === 'FAILURE') {
        return { institutionId, response: syncExternalTransactionsResponse };
      }

      // Update our records in the database
      const response = await this._handleDatabaseUpdates(
        institutionId,
        syncExternalTransactionsResponse.data
      );
      if (response.type === 'FAILURE') {
        return { institutionId, response };
      }

      // Update our pointers
      hasMore = syncExternalTransactionsResponse.data.hasMore;
      cursor = syncExternalTransactionsResponse.data.cursor;
      institution = response.data.institution;
      created = created.concat(response.data.created);
      updated = updated.concat(response.data.updated);
      deleted = deleted.concat(response.data.deleted);
    }

    if (institution == null) {
      return {
        institutionId,
        response: this.failure({
          code: ErrorCode.SYNC_TRANSACTIONS_INSTITUTION_NOT_FOUND,
          params: {
            institutionId
          }
        })
      };
    }

    // TODO: Emit event back up to client here
    return {
      institutionId,
      response: this.success({
        created: created,
        updated: updated,
        deleted: deleted
      })
    };
  }

  private async _handleDatabaseUpdates(
    institutionId: string,
    response: SyncExternalTransactionsResponse
  ) {
    const createTransactionQueriesResponse =
      await this._buildCreateTransactionQueries(response.created);
    if (createTransactionQueriesResponse.type === 'FAILURE') {
      return createTransactionQueriesResponse;
    }

    const syncTransactionsQuery = {
      updateInstitutionQuery: {
        institutionId: institutionId,
        cursor: response.cursor
      },
      createTransactionQueries: createTransactionQueriesResponse.data,
      updateTransactionQueries: response.updated.map(
        TransactionAdapter.toUpdateTransactionQuery
      ),
      deleteTransactionQueries: response.deleted.map(
        TransactionAdapter.toDeleteTransactionQuery
      )
    };

    const syncTransactionsResult = await this._syncTransactionsRepository.sync(
      syncTransactionsQuery
    );

    return this.success({
      institution: InstitutionAdapter.toInstitution(
        syncTransactionsResult.updatedInstitutionRecord
      ),
      created: syncTransactionsResult.createdTransactionRecords.map(
        TransactionAdapter.toTransaction
      ),
      updated: syncTransactionsResult.updatedTransactionRecords.map(
        TransactionAdapter.toTransaction
      ),
      deleted: syncTransactionsResult.deletedTransactionRecords.map(
        TransactionAdapter.toTransaction
      )
    });
  }

  private async _buildCreateTransactionQueries(
    externalTransactions: ExternalTransaction[]
  ): Promise<ServiceResponse<CreateTransactionQuery[]>> {
    const query: FindAccountsByExternalIdsQuery = {
      externalIds: [
        ...new Set(
          externalTransactions.map(
            (externalTransaction) => externalTransaction.accountId
          )
        )
      ]
    };

    const accountRecords =
      await this._findAccountsRepository.findByExternalId(query);
    const accountIdMap = accountRecords.reduce((prev, curr) => {
      return prev.set(curr.externalId, curr.id);
    }, new Map<string, string>());

    const queries: Array<CreateTransactionQuery | null> =
      externalTransactions.map((externalTransaction) => {
        const accountId = accountIdMap.get(externalTransaction.accountId);
        if (accountId == null) {
          return null;
        }
        return TransactionAdapter.toCreateTransactionQuery(
          accountId,
          externalTransaction
        );
      });

    if (queries.some((query) => query === null)) {
      return this.failure(Errors.SYNC_TRANSACTIONS_ACCOUNT_NOT_FOUND);
    }
    return this.success(
      queries.filter((query): query is CreateTransactionQuery => query !== null)
    );
  }

  private _buildResponse(
    syncTransactionResponses: InternalSyncTransactionsResponse[]
  ) {
    const initialValue: SyncTransactionsResponse = {
      succeeded: [],
      failed: [],
      created: [],
      updated: [],
      deleted: []
    };
    return syncTransactionResponses.reduce((prev, curr) => {
      if (curr.response.type === 'FAILURE') {
        return {
          ...prev,
          failed: [...prev.failed, curr.institutionId]
        };
      }

      return {
        ...prev,
        succeeded: [...prev.succeeded, curr.institutionId],
        created: [...prev.created, ...curr.response.data.created],
        updated: [...prev.updated, ...curr.response.data.updated],
        deleted: [...prev.deleted, ...curr.response.data.deleted]
      };
    }, initialValue);
  }
}

interface InternalSyncTransactionsCommand {
  institutionId: string;
  plaidAccessToken: string;
  plaidCursor: string | null;
}

interface InternalSyncTransactionsResponse {
  institutionId: string;
  response: ServiceResponse<
    Omit<SyncTransactionsResponse, 'succeeded' | 'failed'>
  >;
}
