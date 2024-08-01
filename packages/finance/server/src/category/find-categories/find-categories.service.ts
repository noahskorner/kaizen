import { ServiceResponse } from '@kaizen/core';
import { Service } from '@kaizen/core-server';
import {
  Category,
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

  public async find(): Promise<ServiceResponse<Category[]>> {
    throw new Error('Method not implemented.');
    // const response = await this._findCategoriesRepository.find(
    //   command satisfies FindCategoriesQuery
    // );

    // return this.success(response);
  }
}
