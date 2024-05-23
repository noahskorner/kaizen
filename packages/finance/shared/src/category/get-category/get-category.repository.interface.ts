import { CategoryRecord } from '../category-record';
import { GetCategoryByNameQuery } from './get-category-by-name.query';

export interface IGetCategoryRepository {
  getByName(query: GetCategoryByNameQuery): Promise<CategoryRecord | null>;
}
