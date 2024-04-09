import { Repository } from '@kaizen/core-server';
import {
  AccountSnapshotRecord,
  CreateAccountSnapshotQuery,
  ICreateAccountSnapshotRepository
} from '@kaizen/finance';

export class CreateAccountSnapshotRepository
  extends Repository
  implements ICreateAccountSnapshotRepository
{
  public async bulkCreate(
    query: Array<CreateAccountSnapshotQuery>
  ): Promise<Array<AccountSnapshotRecord>> {
    return await this._prisma.$transaction((prisma) => {
      return Promise.all(
        query.map((q) => {
          return prisma.accountSnapshotRecord.create({
            data: q
          });
        })
      );
    });
  }
}
