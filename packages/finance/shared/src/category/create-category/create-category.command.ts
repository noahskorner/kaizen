import { CreateCategoryRequest } from './create-category.request';

export interface CreateCategoryCommand extends CreateCategoryRequest {
  userId: string;
}
