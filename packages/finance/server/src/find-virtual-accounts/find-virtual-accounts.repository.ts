import { Repository } from '@kaizen/core-server';
import {
  FindVirtualAccountsQuery,
  IFindVirtualAccountsRepository,
  VirtualAccountRecord
} from '@kaizen/finance';

export class FindVirtualAccountsRepository
  extends Repository
  implements IFindVirtualAccountsRepository
{
  public async find(
    query: FindVirtualAccountsQuery
  ): Promise<VirtualAccountRecord[]> {
    return await this._prisma.virtualAccountRecord.findMany({
      where: {
        userId: query.userId
      }
    });
  }
}
