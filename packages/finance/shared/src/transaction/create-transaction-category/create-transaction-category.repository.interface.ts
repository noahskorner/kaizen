import { TransactionCategoryRecord } from '../transaction-category-record';
import { CreateTransactionCategoryQuery } from './create-transaction-category.query';

export interface ICreateTransactionCategoryRepository {
  create(
    query: CreateTransactionCategoryQuery
  ): Promise<TransactionCategoryRecord>;
}
