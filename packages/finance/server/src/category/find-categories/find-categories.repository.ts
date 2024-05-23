import { Repository } from '@kaizen/core-server';
import {
  CategoryRecord,
  FindCategoriesQuery,
  IFindCategoriesRepository
} from '@kaizen/finance';

export class FindCategoriesRepository
  extends Repository
  implements IFindCategoriesRepository
{
  public async find(query: FindCategoriesQuery): Promise<CategoryRecord[]> {
    return await this._prisma.categoryRecord.findMany({
      where: {
        userId: query.userId
      }
    });
  }
}
