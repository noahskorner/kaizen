import { Repository } from '@kaizen/core-server';
import {
  IUpdateTransactionRepository,
  TransactionRecord,
  UpdateTransactionQuery
} from '@kaizen/finance';

export class UpdateTransactionRepository
  extends Repository
  implements IUpdateTransactionRepository
{
  public async update(
    query: UpdateTransactionQuery
  ): Promise<TransactionRecord> {
    return this._prisma.transactionRecord.update({
      where: {
        id: query.id
      },
      data: {
        name: query.name,
        amount: query.amount,
        merchantName: query.merchantName,
        description: query.description
      },
      include: {
        location: true,
        category: true
      }
    });
  }
}
