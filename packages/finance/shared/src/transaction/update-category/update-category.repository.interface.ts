import { CategoryRecord } from '../../category/category-record';
import { UpdateCategoryQuery } from './update-category.query';

export interface IUpdateCategoryRepository {
  update(query: UpdateCategoryQuery): Promise<CategoryRecord>;
}
