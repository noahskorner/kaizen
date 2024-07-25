import { ServiceResponse } from '@kaizen/core';
import { Service } from '@kaizen/core-server';
import { ExternalExchangeRate, IExchangeRateProvider } from '@kaizen/finance';
import { mockExternalExchangeRate } from './mock-external-exchange-rate';

export class LocalExchangeRateProvider
  extends Service
  implements IExchangeRateProvider
{
  public async get(): Promise<ServiceResponse<ExternalExchangeRate>> {
    return Promise.resolve(this.success(mockExternalExchangeRate));
  }
}
