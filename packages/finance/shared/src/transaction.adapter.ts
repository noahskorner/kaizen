import { CreateTransactionQuery } from './create-institution/create-transaction.query';
import { ExternalTransaction } from './external-transaction';
import { Transaction } from './transaction';
import { TransactionRecord } from './transaction-record';

export class TransactionAdapter {
  public static toTransaction(
    transactionRecord: TransactionRecord
  ): Transaction {
    const transaction: Transaction = {
      id: transactionRecord.id,
      externalId: transactionRecord.externalId,
      accountId: transactionRecord.accountId,
      externalAccountId: transactionRecord.externalAccountId,
      amount: transactionRecord.amount,
      currency: transactionRecord.currency,
      date: transactionRecord.date,
      name: transactionRecord.name,
      merchantName: transactionRecord.merchantName,
      pending: transactionRecord.pending,
      logoUrl: transactionRecord.logoUrl
    };
    return transaction;
  }

  public static toCreateTransactionQuery(
    externalTransaction: ExternalTransaction
  ): CreateTransactionQuery {
    const createTransactionQuery: CreateTransactionQuery = {
      externalId: externalTransaction.id,
      externalAccountId: externalTransaction.accountId,
      amount: externalTransaction.amount,
      currency: externalTransaction.currency,
      date: externalTransaction.date,
      name: externalTransaction.name,
      merchantName: externalTransaction.merchantName,
      pending: externalTransaction.pending,
      logoUrl: externalTransaction.logoUrl
    };
    return createTransactionQuery;
  }
}
