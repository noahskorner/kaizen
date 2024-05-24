import { Repository } from '@kaizen/core-server';
import {
  CategoryRecord,
  GetCategoryByNameQuery,
  GetCategoryQuery,
  IGetCategoryRepository
} from '@kaizen/finance';

export class GetCategoryRepository
  extends Repository
  implements IGetCategoryRepository
{
  public async get(query: GetCategoryQuery): Promise<CategoryRecord | null> {
    return await this._prisma.categoryRecord.findFirst({
      where: {
        userId: query.userId,
        id: query.categoryId
      }
    });
  }

  public async getByName(
    query: GetCategoryByNameQuery
  ): Promise<CategoryRecord | null> {
    return await this._prisma.categoryRecord.findFirst({
      where: {
        userId: query.userId,
        name: query.name
      }
    });
  }
}
