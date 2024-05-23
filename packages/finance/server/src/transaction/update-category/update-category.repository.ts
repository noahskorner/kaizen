import { Repository } from '@kaizen/core-server';
import {
  CategoryRecord,
  IUpdateCategoryRepository,
  UpdateCategoryQuery
} from '@kaizen/finance';

export class UpdateCategoryRepository
  extends Repository
  implements IUpdateCategoryRepository
{
  public async update(query: UpdateCategoryQuery): Promise<CategoryRecord> {
    return this._prisma.categoryRecord.update({
      where: {
        id: query.categoryId
      },
      data: {
        name: query.name
      }
    });
  }
}
