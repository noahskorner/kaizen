import { ServiceResponse } from '@kaizen/core';
import { FindCategoriesCommand } from './find-categories.command';
import { FindCategoriesResponse } from './find-categories.response';

export interface IFindCategoriesService {
  find(
    command: FindCategoriesCommand
  ): Promise<ServiceResponse<FindCategoriesResponse>>;
}
