import { ServiceResponse } from '@kaizen/core';
import { GetExchangeRateCommand } from './get-exchange-rate.command';
import { ExchangeRate } from '../exchange-rate';

export interface IGetExchangeRateService {
  get(command: GetExchangeRateCommand): Promise<ServiceResponse<ExchangeRate>>;
}
