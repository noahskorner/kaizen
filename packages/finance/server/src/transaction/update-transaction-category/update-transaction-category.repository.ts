import { Repository } from '@kaizen/core-server';
import {
  IUpdateTransactionCategoryRepository,
  TransactionRecord
} from '@kaizen/finance';

export class UpdateTransactionCategoryRepository
  extends Repository
  implements IUpdateTransactionCategoryRepository
{
  public async update(): Promise<TransactionRecord> {
    throw new Error('Method not implemented.');
    // return this._prisma.transactionRecord.update({
    //   where: {
    //     id: query.transactionId
    //   },
    //   data: {
    //     categoryId: query.categoryId
    //   },
    //   include: {
    //     categories: {
    //       include: {
    //         category: true
    //       }
    //     },
    //     location: true
    //   }
    // });
  }
}
