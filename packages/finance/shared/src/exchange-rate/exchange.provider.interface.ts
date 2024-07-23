import { ServiceResponse } from '@kaizen/core';
import { GetExchangeRateCommand } from './get-exchange-rate/get-exchange-rate.command';
import { ExternalExchangeRate } from './external-exchange-rate';

export interface IExchangeProvider {
  get(
    command: GetExchangeRateCommand
  ): Promise<ServiceResponse<ExternalExchangeRate>>;
}
