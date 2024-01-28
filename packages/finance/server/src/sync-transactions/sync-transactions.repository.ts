import { Repository } from '@kaizen/core-server';
import {
  ISyncTransactionsRepository,
  SyncTransactionsResult,
  SyncTransactionsQuery
} from '@kaizen/finance';

export class SyncTransactionsRepository
  extends Repository
  implements ISyncTransactionsRepository
{
  public async sync(
    query: SyncTransactionsQuery
  ): Promise<SyncTransactionsResult> {
    const [updatedInstitutionRecord, ...transactionRecords] =
      await this._prisma.$transaction([
        // Update the institutionRecord with the latest cursor
        this._prisma.institutionRecord.update({
          data: {
            plaidCursor: query.updateInstitutionQuery.cursor,
            updatedAt: new Date()
          },
          where: {
            id: query.updateInstitutionQuery.institutionId
          },
          include: {
            accounts: true
          }
        }),
        // Create the new transactions
        ...query.createTransactionQueries.map((createTransactionQuery) => {
          return this._prisma.transactionRecord.create({
            data: createTransactionQuery
          });
        }),
        // Update the existing transactions
        ...query.updateTransactionQueries.map((updateTransactionQuery) => {
          return this._prisma.transactionRecord.update({
            data: { ...updateTransactionQuery, updatedAt: new Date() },
            where: { externalId: updateTransactionQuery.externalId }
          });
        }),
        // Delete the removed transactions
        ...query.deleteTransactionQueries.map((deleteTransactionQuery) => {
          return this._prisma.transactionRecord.delete({
            where: { externalId: deleteTransactionQuery.externalId }
          });
        })
      ]);

    const result: SyncTransactionsResult = {
      updatedInstitutionRecord,
      createdTransactionRecords: transactionRecords.filter(
        (transactionRecord) =>
          query.createTransactionQueries.some(
            (createTransactionQuery) =>
              createTransactionQuery.externalId === transactionRecord.externalId
          )
      ),
      updatedTransactionRecords: transactionRecords.filter(
        (transactionRecord) =>
          query.updateTransactionQueries.some(
            (updateTransactionQuery) =>
              updateTransactionQuery.externalId === transactionRecord.externalId
          )
      ),
      deletedTransactionRecords: transactionRecords.filter(
        (transactionRecord) =>
          query.deleteTransactionQueries.some(
            (deleteTransactionQuery) =>
              deleteTransactionQuery.externalId === transactionRecord.externalId
          )
      )
    };
    return result;
  }
}
