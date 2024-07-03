import { Repository } from '@kaizen/core-server';
import {
  AccountHistoryRecord,
  CreateAccountHistoryQuery,
  ICreateAccountHistoryRepository
} from '@kaizen/finance';

export class CreateAccountHistoryRepository
  extends Repository
  implements ICreateAccountHistoryRepository
{
  public async bulkCreate(
    query: Array<CreateAccountHistoryQuery>
  ): Promise<Array<AccountHistoryRecord>> {
    return await this._prisma.$transaction((prisma) => {
      return Promise.all(
        query.map((q) => {
          return prisma.accountHistoryRecord.create({
            data: q
          });
        })
      );
    });
  }
}
