import { ExchangeRateRecord } from '../exchange-rate.record';
import { SyncExchangeRateQuery } from './sync-exchange-rate.query';

export interface ISyncExchangeRateRepository {
  sync(query: SyncExchangeRateQuery): Promise<ExchangeRateRecord>;
}
