import { ExchangeRateState } from './exchange-rate.store';

export const selectExchangeRate = (state: ExchangeRateState) =>
  state.exchangeRate.exchangeRate;

export const selectGetNormalizedCurrency =
  ({ exchangeRate: exchangeRateStore }: ExchangeRateState) =>
  (amount: number, currency: string): number => {
    if (
      exchangeRateStore.loading === true ||
      exchangeRateStore.exchangeRate == null ||
      !(currency in exchangeRateStore.exchangeRate.rates)
    ) {
      return 0;
    }

    const rate = exchangeRateStore.exchangeRate.rates[currency];
    return amount / rate;
  };
