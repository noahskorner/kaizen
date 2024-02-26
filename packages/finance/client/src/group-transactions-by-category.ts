import { Category, Transaction } from '@kaizen/finance';
import { v4 as uuid } from 'uuid';

export interface TransactionGroup {
  sum: number;
  average: number;
  percent: number;
  transactions: Transaction[];
}

export const groupTransactionsByCategory = (
  transactions: Transaction[]
): Record<string, TransactionGroup> => {
  // Calculate the total sum of all transactions
  const totalSum = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  // Group transactions by category and calculate the sum, average, and percent for each category
  return transactions.reduce(
    (categoryGroups, transaction) => {
      const category: Category = transaction.category ?? UNCATEGORIZED;

      if (!categoryGroups[category.primary]) {
        categoryGroups[category.primary] = { ...INITIAL_CATEGORY_GROUP };
      }

      categoryGroups[category.primary].transactions.push(transaction);
      categoryGroups[category.primary].sum += transaction.amount;
      categoryGroups[category.primary].average =
        categoryGroups[category.primary].sum /
        categoryGroups[category.primary].transactions.length;
      categoryGroups[category.primary].percent =
        (categoryGroups[category.primary].sum / totalSum) * 100;
      return categoryGroups;
    },
    {} as Record<string, TransactionGroup>
  );
};

const INITIAL_CATEGORY_GROUP: TransactionGroup = {
  sum: 0,
  average: 0,
  percent: 0,
  transactions: []
};

const UNCATEGORIZED: Category = {
  id: uuid(),
  primary: 'UNCATEGORIZED',
  detailed: 'UNCATEGORIZED',
  confidenceLevel: null
};
