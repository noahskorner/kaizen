import { BulkDeleteTransactionCategoryQuery } from './bulk-delete-transaction-category.query';
import { BulkDeleteTransactionCategoryResponse } from './bulk-delete-transaction-category.response';

export interface IDeleteTransactionCategoryRepository {
  bulkDelete(
    query: BulkDeleteTransactionCategoryQuery
  ): Promise<BulkDeleteTransactionCategoryResponse>;
}
