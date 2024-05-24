import { CategoryRecord } from '../category-record';
import { GetCategoryByNameQuery } from './get-category-by-name.query';
import { GetCategoryQuery } from './get-category.query';

export interface IGetCategoryRepository {
  get(query: GetCategoryQuery): Promise<CategoryRecord | null>;
  getByName(query: GetCategoryByNameQuery): Promise<CategoryRecord | null>;
}
