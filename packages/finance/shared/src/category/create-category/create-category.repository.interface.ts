import { CategoryRecord } from '../category-record';
import { CreateCategoryQuery } from './create-category.query';

export interface ICreateCategoryRepository {
  create(query: CreateCategoryQuery): Promise<CategoryRecord>;
}
