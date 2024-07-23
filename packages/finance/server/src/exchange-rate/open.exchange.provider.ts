import {
  ErrorCode,
  OpenExchangeRequestFailedError,
  ServiceResponse
} from '@kaizen/core';
import { Service } from '@kaizen/core-server';
import {
  ExchangeRate,
  GetExchangeRateCommand,
  IExchangeProvider
} from '@kaizen/finance';
import { rejects } from 'assert';
import https from 'https';

export class OpenExchangeProvider extends Service implements IExchangeProvider {
  constructor(private readonly OPEN_EXCHANGE_RATES_APP_ID) {
    super();
  }

  public async get(
    command: GetExchangeRateCommand
  ): Promise<ServiceResponse<ExchangeRate>> {
    const response = await new Promise((resolve, reject) => {
      https
        .get(
          `https://openexchangerates.org/api/latest.json?app_id=${this.OPEN_EXCHANGE_RATES_APP_ID}&base=${command.base}`,
          (res) => {
            let data = '';

            res.on('data', (chunk) => {
              data += chunk;
            });

            res.on('end', () => {
              const data = JSON.parse(data);
            });
          }
        )
        .on('error', (err) => {
          resolve({});
        });
    });
  }
}
