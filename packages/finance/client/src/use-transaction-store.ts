import { create } from 'zustand';
import { Transaction } from '@kaizen/finance';
import {
  TransactionGroup,
  groupTransactionsByCategory
} from './group-transactions-by-category';

type TransactionsByCategoryPie = [string, string | number, string | number];

export interface TransactionStore {
  transactions: Transaction[];
  transactionsByCategory: Record<string, TransactionGroup>;
  transactionsByCategoryPie: TransactionsByCategoryPie[];
  setTransactions: (transactions: Transaction[]) => void;
}

const initialState: Omit<TransactionStore, 'setTransactions'> = {
  transactions: [],
  transactionsByCategory: {},
  transactionsByCategoryPie: []
};

export const useTransactionStore = create<TransactionStore>((set) => ({
  ...initialState,
  setTransactions: (transactions: Transaction[]) => {
    return set(() => {
      const transactionsByCategory = groupTransactionsByCategory(transactions);
      const transactionsByCategoryPie: TransactionsByCategoryPie[] = [
        ['Category', 'Percent', 'Total'],
        ...Object.entries(transactionsByCategory).map(([category, group]) => {
          return [
            category.toLowerCase(),
            Math.abs(group.percent),
            group.sum
          ] as TransactionsByCategoryPie;
        })
      ];

      return {
        transactions: transactions,
        transactionsByCategory: transactionsByCategory,
        transactionsByCategoryPie: transactionsByCategoryPie
      };
    });
  }
}));
