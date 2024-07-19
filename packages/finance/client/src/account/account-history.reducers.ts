import {
  AccountHistoryAction,
  LOAD_ACCOUNT_HISTORY,
  LOAD_ACCOUNT_HISTORY_FAILURE,
  LOAD_ACCOUNT_HISTORY_SUCCESS
} from './account-history.actions';
import { AccountHistoryStore } from './account-history.store';

const initialState: AccountHistoryStore = {
  loading: false,
  accountHistories: []
};

export const accountHistoryReducers = (
  state = initialState,
  action: AccountHistoryAction
): AccountHistoryStore => {
  switch (action.type) {
    case LOAD_ACCOUNT_HISTORY:
      return {
        ...state,
        loading: true,
        accountHistories: []
      };
    case LOAD_ACCOUNT_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        accountHistories: action.payload
      };
    case LOAD_ACCOUNT_HISTORY_FAILURE:
      return {
        ...state,
        loading: false,
        accountHistories: []
      };
    default:
      return state;
  }
};
