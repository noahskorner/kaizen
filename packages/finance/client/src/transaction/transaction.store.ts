import { Transaction } from '@kaizen/finance';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { TransactionAction } from './transaction.actions';

export interface TransactionStore {
  loading: boolean;
  transactions: Transaction[];
}

export type TransactionState = {
  transaction: TransactionStore;
};

export type TransactionDispatch = ThunkDispatch<
  TransactionState,
  unknown,
  TransactionAction
>;
