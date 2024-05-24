import { Repository } from '@kaizen/core-server';
import {
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
        category: true,
        location: true
      }
    });
  }
}
