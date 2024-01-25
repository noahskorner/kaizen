import { ApiResponse, Errors } from '@kaizen/core';
import { Service } from '@kaizen/core-server';
import {
  FindInstitutionsQuery,
  GetInstitutionQuery,
  IFinancialProvider,
  IFindInstitutionsRepository,
  IGetInstitutionRepository,
  ISyncTransactionsRepository,
  ISyncTransactionsService,
  IUpdateInstitutionRepository,
  Institution,
  InstitutionAdapter,
  SyncAllTransactionsCommand,
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
    private readonly _getInstitutionRepository: IGetInstitutionRepository,
    private readonly _financialProvider: IFinancialProvider,
    private readonly _syncTransactionsRepository: ISyncTransactionsRepository,
    private readonly _updateInstitutionRepository: IUpdateInstitutionRepository
  ) {
    super();
  }

  public async syncAll(
    command: SyncAllTransactionsCommand
  ): Promise<Array<ApiResponse<SyncTransactionsResponse>>> {
    const query: FindInstitutionsQuery = {
      userId: command.userId
    };
    const institutionRecords =
      await this._findInstitutionsRepository.find(query);

    return await Promise.all(
      institutionRecords.map(async (institutionRecord) => {
        return this._syncTransactions({
          institutionId: institutionRecord.id,
          plaidAccessToken: institutionRecord.plaidAccessToken,
          plaidCursor: institutionRecord.plaidCursor
        });
      })
    );
  }

  public async sync(
    command: SyncTransactionsCommand
  ): Promise<ApiResponse<SyncTransactionsResponse>> {
    const query: GetInstitutionQuery = {
      userId: command.userId,
      institutionId: command.institutionId
    };
    const institutionRecord = await this._getInstitutionRepository.get(query);
    if (institutionRecord == null) {
      return this.failure(Errors.SYNC_TRANSACTIONS_INSTITUTION_NOT_FOUND);
    }

    return this._syncTransactions({
      institutionId: institutionRecord.id,
      plaidAccessToken: institutionRecord.plaidAccessToken,
      plaidCursor: institutionRecord.plaidCursor
    });
  }

  private async _syncTransactions({
    institutionId,
    plaidAccessToken,
    plaidCursor
  }: {
    institutionId: string;
    plaidAccessToken: string;
    plaidCursor: string | null;
  }): Promise<ApiResponse<SyncTransactionsResponse>> {
    // Initialize our pointers
    let hasMore = true;
    let cursor = plaidCursor;
    let institution: Institution | null = null;
    let created: Transaction[] = [];
    let updated: Transaction[] = [];
    let deleted: Transaction[] = [];

    while (hasMore) {
      // Get a batch from the financial provider
      const response = await this._financialProvider.syncExternalTransactions(
        plaidAccessToken,
        cursor
      );
      if (response.type === 'FAILURE') {
        return response;
      }

      // Update our records in the database
      const updates = await this._handleDatabaseUpdates(
        institutionId,
        response.data
      );

      // Update our pointers
      hasMore = updates.hasMore;
      cursor = updates.cursor;
      institution = updates.institution;
      created = created.concat(updates.created);
      updated = updated.concat(updates.updated);
      deleted = deleted.concat(updates.deleted);
    }

    if (institution == null) {
      return this.failure(Errors.SYNC_TRANSACTIONS_INSTITUTION_NOT_FOUND);
    }
    const syncTransactionsResponse: SyncTransactionsResponse = {
      institution: institution,
      created: created,
      updated: updated,
      deleted: deleted
    };
    // TODO: Emit event back up to client here
    return this.success(syncTransactionsResponse);
  }

  private async _handleDatabaseUpdates(
    institutionId: string,
    response: SyncExternalTransactionsResponse
  ) {
    const updateInstitutionPromise = this._updateInstitutionRepository.update({
      institutionId: institutionId,
      cursor: response.cursor
    });
    const createTransactionsPromise = Promise.all(
      response.created
        .map(TransactionAdapter.toCreateTransactionQuery)
        .map((query) => this._syncTransactionsRepository.create(query))
    );
    const updateTransactionsPromise = Promise.all(
      response.updated
        .map(TransactionAdapter.toUpdateTransactionQuery)
        .map((query) => this._syncTransactionsRepository.update(query))
    );
    const deleteTransactionsPromise = Promise.all(
      response.deleted
        .map(TransactionAdapter.toDeleteTransactionQuery)
        .map((query) => this._syncTransactionsRepository.delete(query))
    );
    const [
      institutionRecord,
      createdTransactions,
      updatedTransactions,
      deletedTransactions
    ] = await Promise.all([
      updateInstitutionPromise,
      createTransactionsPromise,
      updateTransactionsPromise,
      deleteTransactionsPromise
    ]);

    return {
      hasMore: response.hasMore,
      cursor: response.cursor,
      institution: InstitutionAdapter.toInstitution(institutionRecord),
      created: createdTransactions.map(TransactionAdapter.toTransaction),
      updated: updatedTransactions.map(TransactionAdapter.toTransaction),
      deleted: deletedTransactions.map(TransactionAdapter.toTransaction)
    };
  }
}
