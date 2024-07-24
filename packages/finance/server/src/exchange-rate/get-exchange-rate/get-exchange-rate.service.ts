import { ServiceResponse } from '@kaizen/core';
import { Service } from '@kaizen/core-server';
import {
  ExchangeRate,
  GetExchangeRateCommand,
  IExchangeRateProvider,
  IGetExchangeRateService
} from '@kaizen/finance';

export class GetExchangeRateService
  extends Service
  implements IGetExchangeRateService
{
  constructor(private readonly exchangeRateProvider: IExchangeRateProvider) {
    super();
  }

  public async get(
    command: GetExchangeRateCommand
  ): Promise<ServiceResponse<ExchangeRate>> {
    const response = await this.exchangeRateProvider.get(command);

    if (response.type === 'FAILURE') return response;

    return this.success({ id: '', updatedAt: '', ...response.data });
  }
}
