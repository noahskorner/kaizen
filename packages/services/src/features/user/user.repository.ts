import { User } from '@kaizen/core';
import { prisma } from '../../prisma/prisma';
import { CreateUserCommand } from './create-user.command';

export class UserRepository {
  public async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email: email
      }
    });
  }

  public async create(command: CreateUserCommand): Promise<User> {
    return await prisma.user.create({
      data: {
        email: command.email,
        password: command.password
      }
    });
  }
}
