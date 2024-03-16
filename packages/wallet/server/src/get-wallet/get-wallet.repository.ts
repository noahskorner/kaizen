import { Repository } from '@kaizen/core-server';
import {
  GetWalletByUserIdQuery,
  IGetWalletRepository,
  WalletRecord
} from '@kaizen/wallet';

export class GetWalletRepository
  extends Repository
  implements IGetWalletRepository
{
  public getByUserId(
    query: GetWalletByUserIdQuery
  ): Promise<WalletRecord | null> {
    return this._prisma.walletRecord.findUnique({
      where: {
        userId: query.userId
      }
    });
  }
}
