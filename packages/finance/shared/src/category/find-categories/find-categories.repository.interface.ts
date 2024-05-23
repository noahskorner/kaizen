import { CategoryRecord } from '../category-record';
import { FindCategoriesQuery } from './find-categories.query';

export interface IFindCategoriesRepository {
  find(query: FindCategoriesQuery): Promise<CategoryRecord[]>;
}
