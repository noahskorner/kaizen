import { ApiError } from '@kaizen/core';
import { AccountHistory } from '@kaizen/finance';

export const LOAD_ACCOUNT_HISTORY = 'LOAD_ACCOUNT_HISTORY';
export interface LoadAccountHistoryAction {
  type: typeof LOAD_ACCOUNT_HISTORY;
}
export const loadAccountHistoryAction = (): LoadAccountHistoryAction => {
  return {
    type: LOAD_ACCOUNT_HISTORY
  };
};

export const LOAD_ACCOUNT_HISTORY_SUCCESS = 'LOAD_ACCOUNT_HISTORY_SUCCESS';
export interface LoadAccountHistorySuccessAction {
  type: typeof LOAD_ACCOUNT_HISTORY_SUCCESS;
  payload: AccountHistory[];
}
export const loadAccountHistorySuccessAction = (
  accountHistory: AccountHistory[]
): LoadAccountHistorySuccessAction => {
  return {
    type: LOAD_ACCOUNT_HISTORY_SUCCESS,
    payload: accountHistory
  };
};

export const LOAD_ACCOUNT_HISTORY_FAILURE = 'LOAD_ACCOUNT_HISTORY_FAILURE';
export interface LoadAccountHistoryFailureAction {
  type: typeof LOAD_ACCOUNT_HISTORY_FAILURE;
  payload: ApiError[];
}
export const loadAccountHistoryFailureAction = (
  error: ApiError[]
): LoadAccountHistoryFailureAction => {
  return {
    type: LOAD_ACCOUNT_HISTORY_FAILURE,
    payload: error
  };
};

export type AccountHistoryAction =
  | LoadAccountHistoryAction
  | LoadAccountHistorySuccessAction
  | LoadAccountHistoryFailureAction;
