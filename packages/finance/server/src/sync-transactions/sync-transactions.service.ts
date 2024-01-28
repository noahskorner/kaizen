import { ApiResponse, Errors, isArrayEqual } from '@kaizen/core';
import { Service } from '@kaizen/core-server';
import {
  FindInstitutionsQuery,
  IFinancialProvider,
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
    private readonly _financialProvider: IFinancialProvider,
    private readonly _syncTransactionsRepository: ISyncTransactionsRepository
  ) {
    super();
  }

  public async sync(
    command: SyncTransactionsCommand
  ): Promise<ApiResponse<SyncTransactionsResponse>> {
    const findInstitutionResponse = await this._findInstitutions(command);
    if (findInstitutionResponse.type === 'FAILURE') {
      return this.failures(findInstitutionResponse.errors);
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
      return this.failure(Errors.SYNC_TRANSACTIONS_INSTITUTION_NOT_FOUND);
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
      const updates = await this._handleDatabaseUpdates(
        institutionId,
        syncExternalTransactionsResponse.data
      );

      // Update our pointers
      hasMore = syncExternalTransactionsResponse.data.hasMore;
      cursor = syncExternalTransactionsResponse.data.cursor;
      institution = updates.institution;
      created = created.concat(updates.created);
      updated = updated.concat(updates.updated);
      deleted = deleted.concat(updates.deleted);
    }

    if (institution == null) {
      return {
        institutionId,
        response: this.failure(Errors.SYNC_TRANSACTIONS_INSTITUTION_NOT_FOUND)
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
    const syncTransactionsQuery = {
      updateInstitutionQuery: {
        institutionId: institutionId,
        cursor: response.cursor
      },
      createTransactionQueries: response.created.map(
        TransactionAdapter.toCreateTransactionQuery
      ),
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

    return {
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
    };
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
  response: ApiResponse<Omit<SyncTransactionsResponse, 'succeeded' | 'failed'>>;
}
