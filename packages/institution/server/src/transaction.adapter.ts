import { TransactionRecord } from '@kaizen/data';
import { Transaction } from '@kaizen/institution';

export class TransactionAdapter {
  public static toTransaction(
    transactionRecord: TransactionRecord
  ): Transaction {
    const transaction: Transaction = {
      id: transactionRecord.id,
      externalId: transactionRecord.externalId
    };
    return transaction;
  }
}
