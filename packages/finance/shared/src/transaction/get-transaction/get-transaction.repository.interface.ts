import { TransactionRecord } from '../transaction-record';
import { GetTransactionByCategoryQuery } from './get-transaction-by-category-id';

export interface IGetTransactionRepository {
  getByCategory(
    query: GetTransactionByCategoryQuery
  ): Promise<TransactionRecord | null>;
}
