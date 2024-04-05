import { TransactionDispatch } from './transaction.store';
import {
  loadTransactionsAction,
  loadTransactionsFailureAction,
  loadTransactionsSuccessAction
} from './transaction.actions';
import { TransactionClient } from './transaction.client';
import { FindTransactionsRequest } from '@kaizen/finance';

export const loadTransactions = (request: FindTransactionsRequest) => {
  return async (dispatch: TransactionDispatch) => {
    dispatch(loadTransactionsAction());

    const response = await TransactionClient.find(request);
    if (response.type === 'FAILURE')
      return dispatch(loadTransactionsFailureAction(response.errors));

    return dispatch(loadTransactionsSuccessAction(response.data));
  };
};
