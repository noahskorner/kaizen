import {
  ErrorCode,
  GetExchangeRateRequestFailedError,
  ServiceResponse
} from '@kaizen/core';
import { Service } from '@kaizen/core-server';
import {
  ExternalExchangeRate,
  GetExchangeRateCommand,
  IExchangeRateProvider
} from '@kaizen/finance';
import fetch from 'node-fetch';

const OPEN_EXCHANGE_API_URL = 'https://openexchangerates.org/api/latest.json';

export class OpenExchangeRateProvider
  extends Service
  implements IExchangeRateProvider
{
  constructor(private readonly OPEN_EXCHANGE_RATE_APP_ID: string) {
    super();
  }

  public async get(
    command: GetExchangeRateCommand
  ): Promise<ServiceResponse<ExternalExchangeRate>> {
    try {
      const response = await fetch(
        `${OPEN_EXCHANGE_API_URL}?app_id=${this.OPEN_EXCHANGE_RATE_APP_ID}&base=${command.base}&show_alternative=true`
      );
      const body = await response.json();

      if (response.status !== 200) {
        return this.failure({
          code: ErrorCode.GET_EXCHANGE_RATE_REQUEST_FAILED,
          params: {
            error: body
          }
        } satisfies GetExchangeRateRequestFailedError);
      }

      return this.success(body as ExternalExchangeRate);
    } catch (error: unknown) {
      return this.failure({
        code: ErrorCode.GET_EXCHANGE_RATE_REQUEST_FAILED,
        params: {
          error: error
        }
      } satisfies GetExchangeRateRequestFailedError);
    }
  }
}
