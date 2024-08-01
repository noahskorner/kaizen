import { Repository } from '@kaizen/core-server';
import {
  GetTransactionByExternalIdQuery,
  GetTransactionQuery,
  IGetTransactionRepository,
  TransactionRecord
} from '@kaizen/finance';

export class GetTransactionRepository
  extends Repository
  implements IGetTransactionRepository
{
  public async get(
    query: GetTransactionQuery
  ): Promise<TransactionRecord | null> {
    return this._prisma.transactionRecord.findFirst({
      where: {
        id: query.transactionId,
        userId: query.userId
      },
      include: {
        categories: {
          include: {
            category: true
          }
        },
        location: true
      }
    });
  }

  public async getByExternalId({
    externalId
  }: GetTransactionByExternalIdQuery): Promise<TransactionRecord | null> {
    const transactionRecord = await this._prisma.transactionRecord.findFirst({
      include: {
        categories: {
          include: {
            category: true
          }
        },
        location: true
      },
      where: {
        externalId: externalId
      }
    });

    return transactionRecord;
  }
}
