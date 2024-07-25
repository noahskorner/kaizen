import { ExchangeRate } from './exchange-rate';
import { ExchangeRateRecord } from './exchange-rate.record';

export class ExchangeRateAdapter {
  public static toExchangeRate(record: ExchangeRateRecord): ExchangeRate {
    return {
      id: record.id,
      updatedAt: record.updatedAt.toISOString(),
      base: record.base,
      rates: record.rates as {
        [currency: string]: number;
      }
    } satisfies ExchangeRate;
  }
}
