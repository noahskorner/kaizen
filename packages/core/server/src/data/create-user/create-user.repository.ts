import { UserRecord } from '@prisma/client';
import { prisma } from '../_prisma';
import { CreateUserQuery } from './create-user.query';

export class CreateUserRepository {
  public async create(query: CreateUserQuery): Promise<UserRecord> {
    return await prisma.userRecord.create({
      data: {
        email: query.normalizedEmail,
        password: query.hashedPassword
      }
    });
  }
}
