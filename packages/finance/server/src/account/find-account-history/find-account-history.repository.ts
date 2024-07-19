import { Paginated } from '@kaizen/core';
import { Repository } from '@kaizen/core-server';
import {
  AccountHistoryRecord,
  FindAccountHistoryQuery,
  IFindAccountHistoryRepository
} from '@kaizen/finance';

export class FindAccountHistoryRepository
  extends Repository
  implements IFindAccountHistoryRepository
{
  public async find(
    query: FindAccountHistoryQuery
  ): Promise<Paginated<AccountHistoryRecord>> {
    const [accountHistoryRecords, total] = await Promise.all([
      this._prisma.accountHistoryRecord.findMany({
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
      this._prisma.accountHistoryRecord.count({
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
      hits: accountHistoryRecords
    } satisfies Paginated<AccountHistoryRecord>;
  }
}
