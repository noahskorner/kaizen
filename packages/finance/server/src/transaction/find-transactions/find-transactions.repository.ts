import { Repository } from '@kaizen/core-server';
import { Paginated } from '@kaizen/core';
import {
  FindTransactionsQuery,
  TransactionRecord,
  IFindTransactionsRepository
} from '@kaizen/finance';

export class FindTransactionsRepository
  extends Repository
  implements IFindTransactionsRepository
{
  public async find(
    query: FindTransactionsQuery
  ): Promise<Paginated<TransactionRecord>> {
    const where = {
      date: {
        gte: query.startDate,
        lte: query.endDate
      },
      account: {
        institution: {
          userId: query.userId
        }
      }
    };

    const [transactionRecords, total] = await Promise.all([
      this._prisma.transactionRecord.findMany({
        where: where,
        orderBy: {
          date: 'desc'
        },
        skip: query.pageSize * (query.page - 1),
        take: query.pageSize
      }),
      this._prisma.transactionRecord.count({ where: where })
    ]);

    const response: Paginated<TransactionRecord> = {
      hits: transactionRecords,
      total: total
    };
    return response;
  }
}
