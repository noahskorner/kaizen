import { TransactionState } from './transaction.store';
import { createSelector } from 'reselect';

export const selectTransactions = (state: TransactionState) =>
  state.transaction.transactions;

interface TransactionsByCategory {
  category: string;
  amount: number;
}

export const selectTransactionsByCategory = createSelector(
  selectTransactions,
  (transactions) => {
    return transactions.reduce((prev, curr) => {
      const category = curr.category;
      const amount = curr.amount;

      const existingCategory = prev.find(
        (transaction) => transaction.category === category?.primary
      );

      if (existingCategory) {
        existingCategory.amount += amount;
      } else {
        prev.push({ category: category?.primary ?? 'NONE', amount });
      }

      return prev;
    }, new Array<TransactionsByCategory>());
  }
);

export const selectTotalSpent = createSelector(
  selectTransactions,
  (transactions) => {
    return transactions.reduce((prev, curr) => {
      return prev + curr.amount;
    }, 0);
  }
);
