import { create } from 'zustand';
import { Transaction } from '@kaizen/finance';

export interface TransactionStore {
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
}

const initialState: Omit<TransactionStore, 'setTransactions'> = {
  transactions: []
};

const _useTransactionStore = create<TransactionStore>((set) => ({
  ...initialState,
  setTransactions: (transactions: Transaction[]) => {
    return set(() => {
      return {
        transactions: transactions
      };
    });
  }
}));

export const useTransactionStore = () => {
  const transactionStore = _useTransactionStore();

  return { ...transactionStore };
};
