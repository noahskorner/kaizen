import { AccountHistory } from '@kaizen/finance';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { AccountHistoryAction } from './account-history.actions';

export interface AccountHistoryStore {
  loading: boolean;
  accountHistories: AccountHistory[];
}

export type AccountHistoryState = {
  accountHistory: AccountHistoryStore;
};

export type AccountHistoryDispatch = ThunkDispatch<
  AccountHistoryState,
  unknown,
  AccountHistoryAction
>;
