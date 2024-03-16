// eslint-disable-next-line no-restricted-imports
import { PrismaClient } from '@prisma/client';
import { Repository } from '@kaizen/core-server';
import {
  CreateWalletQuery,
  ICreateWalletRepository,
  WalletRecord
} from '@kaizen/wallet';

export class CreateWalletRepository
  extends Repository
  implements ICreateWalletRepository
{
  constructor(_prisma: PrismaClient) {
    super(_prisma);
  }

  public create(query: CreateWalletQuery): Promise<WalletRecord> {
    return this._prisma.walletRecord.create({
      data: query
    });
  }
}
