import { TransactionRecord } from '../transaction-record';
import { GetTransactionQuery } from './get-transaction-by-category-id';

export interface IGetTransactionRepository {
  get(query: GetTransactionQuery): Promise<TransactionRecord | null>;
}
