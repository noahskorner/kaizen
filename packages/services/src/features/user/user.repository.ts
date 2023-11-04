import { UserRecord } from '@prisma/client';
import { prisma } from '../../prisma/prisma';
import { CreateUserCommand } from './create-user.command';

export class UserRepository {
  public async findByEmail(email: string): Promise<UserRecord | null> {
    return await prisma.userRecord.findUnique({
      where: {
        email: email
      }
    });
  }

  public async create(command: CreateUserCommand): Promise<UserRecord> {
    return await prisma.userRecord.create({
      data: {
        email: command.email,
        password: command.password
      }
    });
  }
}
