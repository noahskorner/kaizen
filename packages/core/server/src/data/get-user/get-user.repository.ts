import { UserRecord } from '@prisma/client';
import { prisma } from '../_prisma';
import { GetUserQuery } from './get-user.query';

export class GetUserRepository {
  public async get(query: GetUserQuery): Promise<UserRecord | null> {
    return await prisma.userRecord.findUnique({
      where: {
        id: query.userId
      }
    });
  }
}
