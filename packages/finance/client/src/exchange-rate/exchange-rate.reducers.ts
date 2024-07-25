import {
  ExchangeRateAction,
  LOAD_EXCHANGE_RATE,
  LOAD_EXCHANGE_RATE_FAILURE,
  LOAD_EXCHANGE_RATE_SUCCESS
} from './exchange-rate.actions';
import { ExchangeRateStore } from './exchange-rate.store';

const initialState: ExchangeRateStore = {
  loading: false,
  exchangeRate: null
};

export const exchangeRateReducers = (
  state = initialState,
  action: ExchangeRateAction
): ExchangeRateStore => {
  switch (action.type) {
    case LOAD_EXCHANGE_RATE:
      return {
        loading: true,
        exchangeRate: null
      };
    case LOAD_EXCHANGE_RATE_SUCCESS:
      return {
        loading: false,
        exchangeRate: action.payload
      };
    case LOAD_EXCHANGE_RATE_FAILURE:
      return {
        loading: false,
        exchangeRate: null
      };
    default:
      return state;
  }
};
