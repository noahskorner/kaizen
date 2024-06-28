import { Paginated } from '@kaizen/core';
import { Repository } from '@kaizen/core-server';
import {
  AccountSnapshotRecord,
  FindAccountHistoryQuery,
  IFindAccountHistoryRepository
} from '@kaizen/finance';

export class FindAccountHistoryRepository
  extends Repository
  implements IFindAccountHistoryRepository
{
  public async find(
    query: FindAccountHistoryQuery
  ): Promise<Paginated<AccountSnapshotRecord>> {
    const [accountSnapshotRecords, total] = await Promise.all([
      this._prisma.accountSnapshotRecord.findMany({
        where: {
          account: {
            institution: {
              userId: query.userId
            }
          },
          createdAt: {
            gte: query.startDate,
            lte: query.endDate
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip: query.pageSize * (query.page - 1),
        take: query.pageSize
      }),
      this._prisma.accountSnapshotRecord.count({
        where: {
          account: {
            institution: {
              userId: query.userId
            }
          },
          createdAt: {
            gte: query.startDate,
            lte: query.endDate
          }
        }
      })
    ]);

    return {
      total: total,
      hits: accountSnapshotRecords
    } satisfies Paginated<AccountSnapshotRecord>;
  }
}
