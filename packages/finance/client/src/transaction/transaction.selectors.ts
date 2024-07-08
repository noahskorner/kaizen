import { TransactionState } from './transaction.store';
import { createSelector } from 'reselect';

export const selectTransactions = (state: TransactionState) =>
  state.transaction.transactions;

export const selectTransactionsByCategory = createSelector(
  selectTransactions,
  (transactions) => {
    return transactions
      .reduce((prev, transaction) => {
        if (transaction.category == null) return prev;

        const currentCategory = transaction.category.name.toLowerCase();
        const existingCategory = prev.find(
          (group) => group.name === currentCategory
        );

        if (existingCategory) {
          existingCategory.value += transaction.amount;
        } else {
          prev.push({
            name: currentCategory,
            value: transaction.amount
          });
        }

        return prev;
      }, new Array<{ name: string; value: number }>())
      .sort((a, b) => b.value - a.value);
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
