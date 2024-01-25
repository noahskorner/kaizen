import { Transaction, RemovedTransaction } from 'plaid';
import { ExternalTransaction } from './external-transaction';

export class ExternalTransactionAdapter {
  public static toExternalTransaction(
    transaction: Transaction
  ): ExternalTransaction {
    const externalTransaction: ExternalTransaction = {
      id: transaction.transaction_id,
      accountId: transaction.account_id,
      amount: transaction.amount,
      currency: transaction.iso_currency_code,
      date: transaction.authorized_datetime
        ? new Date(transaction.authorized_datetime)
        : null,
      name: transaction.name,
      merchantName: transaction.merchant_name ?? null,
      pending: transaction.pending,
      logoUrl: transaction.logo_url ?? null
    };

    return externalTransaction;
  }

  public static toRemovedTransaction(
    removedTransactions: string[],
    removedTransaction: RemovedTransaction
  ): string[] {
    if (removedTransaction.transaction_id == null) return removedTransactions;

    return removedTransactions.concat(removedTransaction.transaction_id);
  }
}
