import { Transaction } from 'plaid';
import { ExternalTransaction } from './external-transaction';

export class ExternalTransactionAdapter {
  public static toExternalTransaction(
    transaction: Transaction
  ): ExternalTransaction {
    const externalTransaction: ExternalTransaction = {
      id: transaction.transaction_id,
      accountId: transaction.account_id
    };

    return externalTransaction;
  }
}
