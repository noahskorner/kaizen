import { Repository } from '@kaizen/core-server';
import {
  CategoryRecord,
  CreateCategoryQuery,
  ICreateCategoryRepository
} from '@kaizen/finance';

export class CreateCategoryRepository
  extends Repository
  implements ICreateCategoryRepository
{
  public async create(command: CreateCategoryQuery): Promise<CategoryRecord> {
    return await this._prisma.categoryRecord.create({
      data: {
        userId: command.userId,
        name: command.name
      }
    });
  }
}
