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
  }
}
