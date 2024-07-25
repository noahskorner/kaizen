import { Repository } from '@kaizen/core-server';
import {
  ExchangeRateRecord,
  GetExchangeRateCommand,
  IGetExchangeRateRepository
} from '@kaizen/finance';

export class GetExchangeRateRepository
  extends Repository
  implements IGetExchangeRateRepository
{
  public async get(
    command: GetExchangeRateCommand
  ): Promise<ExchangeRateRecord | null> {
    return this._prisma.exchangeRateRecord.findUnique({
      where: {
        base: command.base
      }
    });
  }
}
