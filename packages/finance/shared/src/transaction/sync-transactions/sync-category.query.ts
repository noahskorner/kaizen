import { CreateCategoryQuery } from './create-category.query';

export interface SyncCategoryQuery extends CreateCategoryQuery {
  id: string;
}
