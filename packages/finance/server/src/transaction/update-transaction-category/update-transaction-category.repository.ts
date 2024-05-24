import { Repository } from '@kaizen/core-server';
import {
  IUpdateTransactionCategoryRepository,
  TransactionRecord,
  UpdateTransactionCategoryQuery
} from '@kaizen/finance';

export class UpdateTransactionCategoryRepository
  extends Repository
  implements IUpdateTransactionCategoryRepository
{
  public async update(
    query: UpdateTransactionCategoryQuery
  ): Promise<TransactionRecord> {
    try {
      return this._prisma.transactionRecord.update({
        where: {
          id: query.transactionId
        },
        data: {
          categoryId: query.categoryId
        },
        include: {
          category: true,
          location: true
        }
      });
    } catch (error) {
      throw new Error();
    }
  }
}
