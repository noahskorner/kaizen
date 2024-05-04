import { CreateCategoryQuery } from './create-category.query';

export interface UpdateCategoryQuery extends CreateCategoryQuery {
  id: string;
}
