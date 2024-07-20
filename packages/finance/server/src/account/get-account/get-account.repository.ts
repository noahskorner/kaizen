import { Repository } from '@kaizen/core-server';
import {
  GetAccountByExternalIdQuery,
  IGetAccountRepository,
  AccountRecord,
  GetAccountByIdQuery
} from '@kaizen/finance';

export class GetAccountRepository
  extends Repository
  implements IGetAccountRepository
{
  public getById(query: GetAccountByIdQuery): Promise<AccountRecord | null> {
    return this._prisma.accountRecord.findFirst({
      where: {
        id: query.accountId,
        institution: {
          userId: query.userId
        }
      }
    });
  }

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
