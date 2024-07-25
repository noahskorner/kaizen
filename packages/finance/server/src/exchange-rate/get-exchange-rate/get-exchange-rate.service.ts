import { ServiceResponse } from '@kaizen/core';
import { Service } from '@kaizen/core-server';
import {
  ExchangeRate,
  ExchangeRateAdapter,
  GetExchangeRateCommand,
  GetExchangeRateQuery,
  GetExchangeRateValidator,
  IExchangeRateProvider,
  IGetExchangeRateRepository,
  IGetExchangeRateService,
  ISyncExchangeRateRepository
} from '@kaizen/finance';

export class GetExchangeRateService
  extends Service
  implements IGetExchangeRateService
{
  constructor(
    private readonly getExchangeRateRepository: IGetExchangeRateRepository,
    private readonly exchangeRateProvider: IExchangeRateProvider,
    private readonly syncExchangeRateRepository: ISyncExchangeRateRepository
  ) {
    super();
  }

  public async get(
    command: GetExchangeRateCommand
  ): Promise<ServiceResponse<ExchangeRate>> {
    const errors = GetExchangeRateValidator.validate(command);
    if (errors.length) {
      return this.failures(errors);
    }

    const exchangeRateRecord =
      await this.getExchangeRateRepository.get(command);

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    if (
      exchangeRateRecord != null &&
      exchangeRateRecord.updatedAt < oneHourAgo
    ) {
      return this.success(
        ExchangeRateAdapter.toExchangeRate(exchangeRateRecord)
      );
    }

    const getLatestExchangeRateResponse = await this.exchangeRateProvider.get(
      command satisfies GetExchangeRateQuery
    );
    if (getLatestExchangeRateResponse.type === 'FAILURE') {
      return getLatestExchangeRateResponse;
    }

    const updatedExchangeRateRecord =
      await this.syncExchangeRateRepository.sync({
        base: getLatestExchangeRateResponse.data.base,
        rates: getLatestExchangeRateResponse.data.rates
      });
    return this.success(
      ExchangeRateAdapter.toExchangeRate(updatedExchangeRateRecord)
    );
  }
}
