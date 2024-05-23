import { ServiceResponse } from '@kaizen/core';
import { FindCategoriesCommand } from './find-categories.command';
import { Category } from '../category';

export interface IFindCategoriesService {
  find(command: FindCategoriesCommand): Promise<ServiceResponse<Category[]>>;
}
