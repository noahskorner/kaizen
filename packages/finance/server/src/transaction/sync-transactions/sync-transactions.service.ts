import { ErrorCode, ServiceResponse } from '@kaizen/core';
import { Service } from '@kaizen/core-server';
import {
  CategoryRecord,
  CreateTransactionQuery,
  ExternalCategory,
  ExternalTransaction,
  FindAccountsByExternalIdsQuery,
  FindInstitutionsQuery,
  IFinancialProvider,
  IFindAccountsRepository,
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
  TransactionAdapter,
  TransactionRecordAdapter,
  UpdateTransactionQuery
} from '@kaizen/finance';

export class SyncTransactionsService
  extends Service
  implements ISyncTransactionsService
{
  constructor(
    private readonly _findInstitutionsRepository: IFindInstitutionsRepository,
    private readonly _findAccountsRepository: IFindAccountsRepository,
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
          userId: command.userId,
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
    userId,
    institutionId,
    plaidAccessToken,
    plaidCursor
  }: _SyncTransactionsCommand): Promise<_SyncTransactionsResponse> {
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
      const response = await this._handleDatabaseUpdates({
        userId,
        institutionId,
        response: syncExternalTransactionsResponse.data
      });
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

    // This should never happen
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

  private async _handleDatabaseUpdates({
    userId,
    institutionId,
    response
  }: _HandleDatabaseUpdatesCommand) {
    const createTransactionQueriesResponse =
      await this._buildCreateTransactionQueries({
        userId,
        institutionId,
        externalTransactions: response.created
      });
    if (createTransactionQueriesResponse.type === 'FAILURE') {
      return createTransactionQueriesResponse;
    }

    const updateTransactionQueriesResponse =
      await this._buildUpdateTransactionQueries(response.updated);
    if (updateTransactionQueriesResponse.type === 'FAILURE') {
      return updateTransactionQueriesResponse;
    }

    const syncTransactionsQuery = {
      updateInstitutionQuery: {
        institutionId: institutionId,
        cursor: response.cursor
      },
      createTransactionQueries: createTransactionQueriesResponse.data,
      updateTransactionQueries: updateTransactionQueriesResponse.data,
      deleteTransactionQueries: response.deleted.map(
        TransactionRecordAdapter.toDeleteTransactionQuery
      )
    };
    const syncTransactionsResponse =
      await this._syncTransactionsRepository.sync(syncTransactionsQuery);

    return this.success({
      institution: InstitutionAdapter.toInstitution(
        syncTransactionsResponse.updatedInstitutionRecord
      ),
      created: syncTransactionsResponse.createdTransactionRecords.map(
        TransactionAdapter.toTransaction
      ),
      updated: syncTransactionsResponse.updatedTransactionRecords.map(
        TransactionAdapter.toTransaction
      ),
      deleted: syncTransactionsResponse.deletedTransactionRecords.map(
        TransactionAdapter.toTransaction
      )
    });
  }

  private async _buildCreateTransactionQueries({
    userId,
    institutionId,
    externalTransactions
  }: _BuildCreateTransactionQueriesCommand): Promise<
    ServiceResponse<CreateTransactionQuery[]>
  > {
    // Find the existing accounts
    const query: FindAccountsByExternalIdsQuery = {
      externalIds: [
        ...new Set(
          externalTransactions.map(
            (externalTransaction) => externalTransaction.externalAccountId
          )
        )
      ]
    };
    const accountRecords =
      await this._findAccountsRepository.findByExternalId(query);
    const accountIdMap = accountRecords.reduce((prev, curr) => {
      return prev.set(curr.externalId, curr.id);
    }, new Map<string, string>());

    // Build the create transaction queries
    const missingAccountIds: string[] = [];
    const queries: CreateTransactionQuery[] = [];
    for (const externalTransaction of externalTransactions) {
      const accountId = accountIdMap.get(externalTransaction.externalAccountId);

      // This means the account was not created. This should not happen.
      if (accountId == null) {
        missingAccountIds.push(externalTransaction.externalAccountId);
        continue;
      }

      // Get or create the category (if applicable)
      const categoryId = externalTransaction.category
        ? (
            await this._syncTransactionsRepository.getOrCreateCategory({
              primary: externalTransaction.category.primary,
              detailed: externalTransaction.category.detailed,
              confidenceLevel: externalTransaction.category.confidenceLevel
            })
          ).id
        : null;

      // Map to the database query
      queries.push(
        TransactionRecordAdapter.toCreateTransactionQuery({
          userId,
          institutionId,
          accountId,
          externalTransaction,
          categoryId
        })
      );
    }

    if (missingAccountIds.length > 0) {
      return this.failure({
        code: ErrorCode.SYNC_TRANSACTIONS_ACCOUNTS_NOT_FOUND,
        params: { externalAccountIds: missingAccountIds }
      });
    }
    return this.success(queries);
  }

  private async _buildUpdateTransactionQueries(
    externalTransactions: ExternalTransaction[]
  ): Promise<ServiceResponse<UpdateTransactionQuery[]>> {
    // Build the update transaction queries
    const missingTransactionIds: string[] = [];
    const queries: UpdateTransactionQuery[] = [];
    for (const externalTransaction of externalTransactions) {
      // Find the existing transaction
      const transaction =
        await this._syncTransactionsRepository.getByExternalId(
          externalTransaction.externalId
        );
      if (transaction === null) {
        missingTransactionIds.push(externalTransaction.externalId);
        continue;
      }

      const categoryId = await this._syncCategory(
        transaction.category,
        externalTransaction.category
      );

      // Map to the database query
      queries.push(
        TransactionRecordAdapter.toUpdateTransactionQuery({
          id: transaction.id,
          externalTransaction,
          locationId: transaction.locationId,
          categoryId: categoryId
        })
      );
    }

    if (missingTransactionIds.length > 0) {
      return this.failure({
        code: ErrorCode.SYNC_TRANSACTIONS_TRANSACTIONS_NOT_FOUND,
        params: { externalTransactionIds: missingTransactionIds }
      });
    }
    return this.success(queries);
  }

  private _buildResponse(
    syncTransactionResponses: _SyncTransactionsResponse[]
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

  private async _syncCategory(
    record: CategoryRecord | null,
    external: ExternalCategory | null
  ): Promise<string | null> {
    // This record no longer has a category, let's disconnect it
    if (external == null) {
      return null;
    }

    // This record already has the same category, let's keep it
    if (
      record?.primary === external.primary &&
      record?.detailed === external.detailed &&
      record?.confidenceLevel === external.confidenceLevel
    ) {
      return record.id;
    }

    // This record has a different category, let's update it
    const categoryRecord =
      await this._syncTransactionsRepository.getOrCreateCategory({
        primary: external.primary,
        detailed: external.detailed,
        confidenceLevel: external.confidenceLevel
      });
    return categoryRecord.id;
  }
}

interface _SyncTransactionsCommand {
  userId: string;
  institutionId: string;
  plaidAccessToken: string;
  plaidCursor: string | null;
}

interface _SyncTransactionsResponse {
  institutionId: string;
  response: ServiceResponse<
    Omit<SyncTransactionsResponse, 'succeeded' | 'failed'>
  >;
}

interface _HandleDatabaseUpdatesCommand {
  userId: string;
  institutionId: string;
  response: SyncExternalTransactionsResponse;
}

interface _BuildCreateTransactionQueriesCommand {
  userId: string;
  institutionId: string;
  externalTransactions: ExternalTransaction[];
}
