import { FindAllAccountsQuery } from './find-all-accounts.query';
import { prisma } from './prisma';
import { AccountRecord } from '@prisma/client';

export class AccountRepository {
  public async create(
    userId: string,
    plaidAccessToken: string
  ): Promise<AccountRecord> {
    return await prisma.accountRecord.create({
      data: {
        userId,
        plaidAccessToken
      }
    });
  }

  public async findAll(query: FindAllAccountsQuery): Promise<AccountRecord[]> {
    return await prisma.accountRecord.findMany({
      where: {
        userId: query.userId
      }
    });
  }
}
