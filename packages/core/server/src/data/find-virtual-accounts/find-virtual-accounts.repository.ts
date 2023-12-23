import { prisma } from '../_prisma';
import { VirtualAccountRecord } from '../virtual-account-record';
import { FindVirtualAccountsQuery } from './find-virtual-accounts.query';

export class FindVirtualAccountsRepository {
  public async find(
    query: FindVirtualAccountsQuery
  ): Promise<VirtualAccountRecord[]> {
    return await prisma.virtualAccountRecord.findMany({
      where: {
        userId: query.userId
      }
    });
  }
}
