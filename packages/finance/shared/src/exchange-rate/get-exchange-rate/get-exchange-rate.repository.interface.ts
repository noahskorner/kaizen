import { ExchangeRateRecord } from '../exchange-rate.record';
import { GetExchangeRateQuery } from './get-exchange-rate.query';

export interface IGetExchangeRateRepository {
  get(query: GetExchangeRateQuery): Promise<ExchangeRateRecord | null>;
}
