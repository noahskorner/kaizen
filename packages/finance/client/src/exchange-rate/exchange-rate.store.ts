import { ExchangeRate } from '@kaizen/finance';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { ExchangeRateAction } from './exchange-rate.actions';

export interface ExchangeRateStore {
  loading: boolean;
  exchangeRate: ExchangeRate | null;
}

export type ExchangeRateState = {
  exchangeRate: ExchangeRateStore;
};

export type ExchangeRateDispatch = ThunkDispatch<
  ExchangeRateState,
  unknown,
  ExchangeRateAction
>;
