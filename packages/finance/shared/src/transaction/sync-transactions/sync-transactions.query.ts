import { CreateTransactionQuery } from './create-transaction.query';
import { DeleteTransactionQuery } from './delete-transaction.query';
import { UpdateInstitutionQuery } from './update-institution.query';
import { UpdateTransactionQuery } from './update-transaction.query';

export interface SyncTransactionsQuery {
  updateInstitutionQuery: UpdateInstitutionQuery;
  createTransactionQueries: CreateTransactionQuery[];
  updateTransactionQueries: UpdateTransactionQuery[];
  deleteTransactionQueries: DeleteTransactionQuery[];
}
