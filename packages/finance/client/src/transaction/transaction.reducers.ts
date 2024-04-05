import { TransactionStore } from './transaction.store';
import {
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_FAILURE,
  LOAD_TRANSACTIONS_SUCCESS,
  TransactionAction
} from './transaction.actions';

const initialState: TransactionStore = {
  loading: false,
  transactions: []
};

export const transactionReducers = (
  state = initialState,
  action: TransactionAction
): TransactionStore => {
  switch (action.type) {
    case LOAD_TRANSACTIONS:
      return {
        loading: true,
        transactions: []
      };
    case LOAD_TRANSACTIONS_SUCCESS:
      return {
        loading: false,
        transactions: action.payload.hits
      };
    case LOAD_TRANSACTIONS_FAILURE:
      return {
        loading: false,
        transactions: []
      };
    default:
      return state;
  }
};
