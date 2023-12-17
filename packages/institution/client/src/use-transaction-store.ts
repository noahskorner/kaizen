import { create } from 'zustand';
import { Transaction } from '@kaizen/institution';

export interface TransactionStore {
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
}

const initialState: Omit<TransactionStore, 'setTransactions'> = {
  transactions: []
};

export const useTransactionStore = create<TransactionStore>((set) => ({
  ...initialState,
  setTransactions: (transactions: Transaction[]) => {
    return set(() => {
      return {
        transactions: transactions
      };
    });
  }
}));
