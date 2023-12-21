import { Paginated } from '@kaizen/core';
import { prisma, TransactionRecord } from '@kaizen/data';
import { FindTransactionsQuery } from './find-transactions.query';

export class FindTransactionsRepository {
  public async findAll(
    query: FindTransactionsQuery
  ): Promise<Paginated<TransactionRecord>> {
    const where = {
      account: {
        institution: {
          userId: query.userId
        }
      }
    };

    const [transactionRecords, total] = await Promise.all([
      prisma.transactionRecord.findMany({
        where: where,
        orderBy: {
          date: 'desc'
        },
        skip: query.pageSize * (query.page - 1),
        take: query.pageSize
      }),
      prisma.transactionRecord.count({ where: where })
    ]);

    const response: Paginated<TransactionRecord> = {
      hits: transactionRecords,
      total: total
    };
    return response;
  }
}
