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
}
