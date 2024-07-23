import {
  ErrorCode,
  OpenExchangeRequestFailedError,
  ServiceResponse
} from '@kaizen/core';
import { Service } from '@kaizen/core-server';
import {
  ExternalExchangeRate,
  GetExchangeRateCommand,
  IExchangeProvider
} from '@kaizen/finance';
import fetch from 'node-fetch';

const OPEN_EXCHANGE_API_URL = 'https://openexchangerates.org/api/latest.json';

export class OpenExchangeProvider extends Service implements IExchangeProvider {
  constructor(private readonly OPEN_EXCHANGE_RATES_APP_ID: string) {
    super();
  }

  public async get(
    command: GetExchangeRateCommand
  ): Promise<ServiceResponse<ExternalExchangeRate>> {
    try {
      const response = await fetch(
        `${OPEN_EXCHANGE_API_URL}?app_id=${this.OPEN_EXCHANGE_RATES_APP_ID}&base=${command.base}`
      );
      const body = await response.json();

      if (response.status !== 200) {
        return this.failure({
          code: ErrorCode.OPEN_EXCHANGE_REQUEST_FAILED,
          params: {
            error: body
          }
        } satisfies OpenExchangeRequestFailedError);
      }

      return this.success(body as ExternalExchangeRate);
    } catch (error: unknown) {
      return this.failure({
        code: ErrorCode.OPEN_EXCHANGE_REQUEST_FAILED,
        params: {
          error: error
        }
      } satisfies OpenExchangeRequestFailedError);
    }
  }
}
