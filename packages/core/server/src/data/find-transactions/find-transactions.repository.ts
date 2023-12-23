import { prisma } from '../_prisma';
import { TransactionRecord } from '../transaction-record';
import { FindTransactionsQuery } from './find-transactions.query';
import { Paginated } from '@kaizen/core';

export class FindTransactionsRepository {
  constructor() {}

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
