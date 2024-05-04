import { UpdateCategoryRequest } from './update-category.request';

export interface UpdateCategoryCommand extends UpdateCategoryRequest {
  userId: string;
  transactionId: string;
  categoryId: string;
}
