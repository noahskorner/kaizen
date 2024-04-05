import { Transaction } from '@kaizen/finance';
import { TransactionState } from './transaction.store';

export const selectTransactions = (store: TransactionState): Transaction[] => {
  return store.transaction.transactions;
};
