import { ExchangeRateState } from './exchange-rate.store';

export const selectExchangeRate = (state: ExchangeRateState) =>
  state.exchangeRate.exchangeRate;
