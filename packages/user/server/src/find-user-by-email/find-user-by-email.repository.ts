import { IFindUserByEmailRepository, UserRecord } from '@kaizen/user';
import { FindUserByEmailQuery } from './find-user-by-email.query';
import { Repository } from '@kaizen/core-server';

export class FindUserByEmailRepository
  extends Repository
  implements IFindUserByEmailRepository
{
  public async find(query: FindUserByEmailQuery): Promise<UserRecord | null> {
    return await this._prisma.userRecord.findUnique({
      where: {
        email: query.normalizedEmail
      }
    });
  }
}
