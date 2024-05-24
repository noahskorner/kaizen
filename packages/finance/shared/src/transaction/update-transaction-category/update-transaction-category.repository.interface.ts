import { TransactionRecord } from '../transaction-record';
import { UpdateTransactionCategoryQuery } from './update-transaction-category.query';

export interface IUpdateTransactionCategoryRepository {
  update(query: UpdateTransactionCategoryQuery): Promise<TransactionRecord>;
}
