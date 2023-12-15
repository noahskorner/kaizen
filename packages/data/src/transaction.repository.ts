import { TransactionRecord } from './transaction-record';
import { FindAllTransactionsQuery } from './find-all-transactions.query';
import { prisma } from './prisma';
import { Paginated } from '@kaizen/core';

export class TransactionRepository {
  constructor() {}

  public async findAll(
    query: FindAllTransactionsQuery
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
          createdAt: 'desc'
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
