import { TransactionRecord } from '../transaction-record';
import { CreateTransactionQuery } from './create-transaction.query';
import { DeleteTransactionQuery } from './delete-transaction.query';
import { UpdateTransactionQuery } from './update-transaction.query';

export interface ISyncTransactionsRepository {
  create(query: CreateTransactionQuery): Promise<TransactionRecord>;
  update(query: UpdateTransactionQuery): Promise<TransactionRecord>;
  delete(query: DeleteTransactionQuery): Promise<TransactionRecord>;
}
