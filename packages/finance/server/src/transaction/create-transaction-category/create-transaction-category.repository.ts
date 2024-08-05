import { Repository } from '@kaizen/core-server';
import {
  CreateTransactionCategoryQuery,
  ICreateTransactionCategoryRepository,
  TransactionCategoryRecord
} from '@kaizen/finance';

export class CreateTransactionCategoryRepository
  extends Repository
  implements ICreateTransactionCategoryRepository
{
  public async create(
    query: CreateTransactionCategoryQuery
  ): Promise<TransactionCategoryRecord> {
    return this._prisma.transactionCategoryRecord.create({
      data: {
        categoryId: query.categoryId,
        transactionId: query.transactionId
      },
      include: {
        category: true
      }
    });
  }
}
