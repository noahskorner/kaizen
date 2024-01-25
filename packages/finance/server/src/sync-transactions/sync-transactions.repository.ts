import { Repository } from '@kaizen/core-server';
import {
  CreateTransactionQuery,
  DeleteTransactionQuery,
  ISyncTransactionsRepository,
  TransactionRecord,
  UpdateTransactionQuery
} from '@kaizen/finance';

export class SyncTransactionsRepository
  extends Repository
  implements ISyncTransactionsRepository
{
  public async create(
    query: CreateTransactionQuery
  ): Promise<TransactionRecord> {
    const accountRecord = await this._prisma.accountRecord.findUniqueOrThrow({
      where: { externalId: query.externalAccountId }
    });

    return this._prisma.transactionRecord.create({
      data: { ...query, accountId: accountRecord.id }
    });
  }

  public async update(
    query: UpdateTransactionQuery
  ): Promise<TransactionRecord> {
    return this._prisma.transactionRecord.update({
      where: { externalId: query.externalId },
      data: query
    });
  }

  public async delete(
    query: DeleteTransactionQuery
  ): Promise<TransactionRecord> {
    return this._prisma.transactionRecord.delete({
      where: { externalId: query.externalTransactionId }
    });
  }
}
