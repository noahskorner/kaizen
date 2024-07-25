import { Repository } from '@kaizen/core-server';
import {
  ExchangeRateRecord,
  ISyncExchangeRateRepository,
  SyncExchangeRateQuery
} from '@kaizen/finance';

export class SyncExchangeRateRepository
  extends Repository
  implements ISyncExchangeRateRepository
{
  public async sync(query: SyncExchangeRateQuery): Promise<ExchangeRateRecord> {
    return this._prisma.exchangeRateRecord.upsert({
      where: {
        base: query.base
      },
      update: {
        rates: query.rates
      },
      create: {
        base: query.base,
        rates: query.rates
      }
    });
  }
}
