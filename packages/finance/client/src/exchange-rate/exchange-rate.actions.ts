import { ApiError } from '@kaizen/core';
import { ExchangeRate } from '@kaizen/finance';

export const LOAD_EXCHANGE_RATE = 'LOAD_EXCHANGE_RATE';
export interface LoadExchangeRateAction {
  type: typeof LOAD_EXCHANGE_RATE;
}
export const loadExchangeRateAction = (): LoadExchangeRateAction => {
  return {
    type: LOAD_EXCHANGE_RATE
  };
};

export const LOAD_EXCHANGE_RATE_SUCCESS = 'LOAD_EXCHANGE_RATE_SUCCESS';
export interface LoadExchangeRateSuccessAction {
  type: typeof LOAD_EXCHANGE_RATE_SUCCESS;
  payload: ExchangeRate;
}
export const loadExchangeRateSuccessAction = (
  exchangeRate: ExchangeRate
): LoadExchangeRateSuccessAction => {
  return {
    type: LOAD_EXCHANGE_RATE_SUCCESS,
    payload: exchangeRate
  };
};

export const LOAD_EXCHANGE_RATE_FAILURE = 'LOAD_EXCHANGE_RATE_FAILURE';
export interface LoadExchangeRateFailureAction {
  type: typeof LOAD_EXCHANGE_RATE_FAILURE;
  payload: ApiError[];
}
export const loadExchangeRateFailureAction = (
  error: ApiError[]
): LoadExchangeRateFailureAction => {
  return {
    type: LOAD_EXCHANGE_RATE_FAILURE,
    payload: error
  };
};

export type ExchangeRateAction =
  | LoadExchangeRateAction
  | LoadExchangeRateSuccessAction
  | LoadExchangeRateFailureAction;
