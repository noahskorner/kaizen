import { Repository } from '@kaizen/core-server';
import {
  GetTransactionByCategoryQuery,
  IGetTransactionRepository,
  TransactionRecord
} from '@kaizen/finance';

export class GetTransactionRepository
  extends Repository
  implements IGetTransactionRepository
{
  public async getByCategory(
    query: GetTransactionByCategoryQuery
  ): Promise<TransactionRecord | null> {
    return this._prisma.transactionRecord.findFirst({
      where: {
        id: query.transactionId,
        userId: query.userId,
        categoryId: query.categoryId
      },
      include: {
        category: true,
        location: true
      }
    });
  }
}
