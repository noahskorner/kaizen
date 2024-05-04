import { CreateTransactionQuery } from './create-transaction.query';
import { DeleteTransactionQuery } from './delete-transaction.query';
import { SyncTransactionQuery } from './sync-transaction.query';
import { SyncInstitutionQuery } from './sync-institution.query';

export interface SyncTransactionsQuery {
  syncInstitutionQuery: SyncInstitutionQuery;
  createTransactionQueries: CreateTransactionQuery[];
  syncTransactionQueries: SyncTransactionQuery[];
  deleteTransactionQueries: DeleteTransactionQuery[];
}
