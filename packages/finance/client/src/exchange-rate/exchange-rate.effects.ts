import {
  loadExchangeRateAction,
  loadExchangeRateFailureAction,
  loadExchangeRateSuccessAction
} from './exchange-rate.actions';
import { ExchangeRateDispatch } from './exchange-rate.store';
import { ExchangeRateClient } from './get-exchange-rate.client';

export const loadExchangeRate = () => {
  return async (dispatch: ExchangeRateDispatch) => {
    dispatch(loadExchangeRateAction());

    const response = await ExchangeRateClient.get();
    if (response.type === 'FAILURE')
      return dispatch(loadExchangeRateFailureAction(response.errors));

    return dispatch(loadExchangeRateSuccessAction(response.data));
  };
};
