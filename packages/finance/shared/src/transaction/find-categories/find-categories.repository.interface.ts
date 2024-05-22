import { FindCategoriesQuery } from './find-categories.query';
import { FindCategoriesResponse } from './find-categories.response';

export interface IFindCategoriesRepository {
  find(query: FindCategoriesQuery): Promise<FindCategoriesResponse>;
}
