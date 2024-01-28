import { Repository } from '@kaizen/core-server';
import {
  GetAccountByExternalIdQuery,
  IGetAccountRepository,
  AccountRecord
} from '@kaizen/finance';

export class GetAccountRepository
  extends Repository
  implements IGetAccountRepository
{
  public getByExternalId(
    query: GetAccountByExternalIdQuery
  ): Promise<AccountRecord | null> {
    return this._prisma.accountRecord.findUnique({
      where: {
        externalId: query.externalAccountId
      }
    });
  }
}
