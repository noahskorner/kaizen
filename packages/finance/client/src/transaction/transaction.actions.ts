import { ApiError, Paginated } from '@kaizen/core';
import { Category, Transaction } from '@kaizen/finance';

export const LOAD_TRANSACTIONS = 'LOAD_TRANSACTIONS';
export interface LoadTransactionsAction {
  type: typeof LOAD_TRANSACTIONS;
}
export const loadTransactionsAction = (): LoadTransactionsAction => {
  return {
    type: LOAD_TRANSACTIONS
  };
};

export const LOAD_TRANSACTIONS_SUCCESS = 'LOAD_TRANSACTIONS_SUCCESS';
export interface LoadTransactionsSuccessAction {
  type: typeof LOAD_TRANSACTIONS_SUCCESS;
  payload: Paginated<Transaction>;
}
export const loadTransactionsSuccessAction = (
  response: Paginated<Transaction>
): LoadTransactionsSuccessAction => {
  return {
    type: LOAD_TRANSACTIONS_SUCCESS,
    payload: response
  };
};

export const LOAD_TRANSACTIONS_FAILURE = 'LOAD_TRANSACTIONS_FAILURE';
export interface LoadTransactionsFailureAction {
  type: typeof LOAD_TRANSACTIONS_FAILURE;
  payload: ApiError[];
}
export const loadTransactionsFailureAction = (
  errors: ApiError[]
): LoadTransactionsFailureAction => {
  return {
    type: LOAD_TRANSACTIONS_FAILURE,
    payload: errors
  };
};

export const SET_TRANSACTION_CATEGORY = 'SET_TRANSACTION_CATEGORY';
export interface SetTransactionAction {
  type: typeof SET_TRANSACTION_CATEGORY;
  payload: {
    transactionId: string;
    category: Category;
  };
}
export const setTransactionCategory = (
  payload: SetTransactionAction['payload']
): SetTransactionAction => {
  return {
    type: SET_TRANSACTION_CATEGORY,
    payload: payload
  };
};

export type TransactionAction =
  | LoadTransactionsAction
  | LoadTransactionsSuccessAction
  | LoadTransactionsFailureAction
  | SetTransactionAction;
