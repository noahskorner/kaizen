import { ServiceResponse } from '@kaizen/core';
import { Service } from '@kaizen/core-server';
import {
  Category,
  CategoryAdapter,
  FindCategoriesCommand,
  FindCategoriesQuery,
  IFindCategoriesRepository,
  IFindCategoriesService
} from '@kaizen/finance';

export class FindCategoriesService
  extends Service
  implements IFindCategoriesService
{
  constructor(
    private readonly _findCategoriesRepository: IFindCategoriesRepository
  ) {
    super();
  }

  public async find(
    command: FindCategoriesCommand
  ): Promise<ServiceResponse<Category[]>> {
    const records = await this._findCategoriesRepository.find(
      command satisfies FindCategoriesQuery
    );

    return this.success(CategoryAdapter.toCategories(records));
  }
}
