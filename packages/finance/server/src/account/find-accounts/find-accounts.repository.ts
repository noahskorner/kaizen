import { Repository } from '@kaizen/core-server';
import {
  AccountRecord,
  FindAccountsByExternalIdsQuery,
  FindAccountsByUserIdQuery,
  IFindAccountsRepository
} from '@kaizen/finance';

export class FindAccountsRepository
  extends Repository
  implements IFindAccountsRepository
{
  public async findByUserId(
    query: FindAccountsByUserIdQuery
  ): Promise<AccountRecord[]> {
    return this._prisma.accountRecord.findMany({
      where: {
        institution: {
          userId: query.userId
        }
      }
    });
  }

  public async findByExternalId(
    query: FindAccountsByExternalIdsQuery
  ): Promise<AccountRecord[]> {
    return this._prisma.accountRecord.findMany({
      where: {
        externalId: {
          in: query.externalIds
        }
      }
    });
  }
}
