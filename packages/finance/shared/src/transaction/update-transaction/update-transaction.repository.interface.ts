import { TransactionRecord } from '../transaction-record';
import { UpdateTransactionQuery } from './update-transaction.query';

export interface IUpdateTransactionRepository {
  update(query: UpdateTransactionQuery): Promise<TransactionRecord>;
}
