import { UserRecord } from '@prisma/client';
import { prisma } from '../_prisma';
import { FindUserByEmailQuery } from './find-user-by-email.query';

export class FindUserByEmailRepository {
  public async findByEmail(
    query: FindUserByEmailQuery
  ): Promise<UserRecord | null> {
    return await prisma.userRecord.findUnique({
      where: {
        email: query.normalizedEmail
      }
    });
  }
}
