import { CreateUserQuery, UserRecord } from '@kaizen/user';
import { Repository } from '@kaizen/core-server';

export class CreateUserRepository
  extends Repository
  implements CreateUserRepository
{
  public async create(query: CreateUserQuery): Promise<UserRecord> {
    return await this._prisma.userRecord.create({
      data: {
        email: query.normalizedEmail,
        password: query.hashedPassword
      }
    });
  }
}
