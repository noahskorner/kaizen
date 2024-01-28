import { Repository } from '@kaizen/core-server';
import {
  AccountRecord,
  CreateAccountQuery,
  ISyncAccountsRepository,
  UpdateAccountQuery
} from '@kaizen/finance';

export class SyncAccountsRepository
  extends Repository
  implements ISyncAccountsRepository
{
  public async create(query: CreateAccountQuery): Promise<AccountRecord> {
    return this._prisma.accountRecord.create({
      data: query
    });
  }

  public async update(query: UpdateAccountQuery): Promise<AccountRecord> {
    return this._prisma.accountRecord.update({
      where: {
        id: query.id
      },
      data: {
        ...query,
        updatedAt: new Date()
      }
    });
  }
}
