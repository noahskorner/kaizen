import { UpdateTransactionCategoryRequest } from './update-transaction-category.request';

export interface UpdateTransactionCategoryCommand
  extends UpdateTransactionCategoryRequest {
  userId: string;
  transactionId: string;
}
