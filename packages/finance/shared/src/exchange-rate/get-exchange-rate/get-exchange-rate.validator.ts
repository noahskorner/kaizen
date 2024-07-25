import {
  ErrorCode,
  GetExchangeRateInvalidCurrencyError,
  ServiceError
} from '@kaizen/core';
import { GetExchangeRateCommand } from './get-exchange-rate.command';
import { SUPPORTED_CURRENCIES } from './supported-currencies';

export class GetExchangeRateValidator {
  public static validate(command: GetExchangeRateCommand): ServiceError[] {
    if (Object.keys(SUPPORTED_CURRENCIES).includes(command.base)) {
      return [];
    }

    return [
      {
        code: ErrorCode.GET_EXCHANGE_RATE_INVALID_CURRENCY,
        params: {
          base: command.base
        }
      } satisfies GetExchangeRateInvalidCurrencyError
    ];
  }
}
