import { ApiClient, handleAxiosRequest } from '@kaizen/core-client';
import { ApiResponse } from '@kaizen/core';
import { ExchangeRate } from '@kaizen/finance';

export const ExchangeRateClient = {
  get: (): Promise<ApiResponse<ExchangeRate>> => {
    return handleAxiosRequest(() => {
      // TODO: Hard coding to USD for now
      return ApiClient.get<ApiResponse<ExchangeRate>>(`/exchange-rate/USD`);
    });
  }
};
