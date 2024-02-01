import { Repository } from '@kaizen/core-server';
import {
  AccountRecord,
  FindAccountsByExternalIdsQuery,
  IFindAccountsRepostiory
} from '@kaizen/finance';

export class FindAccountsRepository
  extends Repository
  implements IFindAccountsRepostiory
{
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
