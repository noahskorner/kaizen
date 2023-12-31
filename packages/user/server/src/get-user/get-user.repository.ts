import { Repository } from '@kaizen/core-server';
import { GetUserQuery, IGetUserRepository, UserRecord } from '@kaizen/user';

export class GetUserRepository
  extends Repository
  implements IGetUserRepository
{
  public async get(query: GetUserQuery): Promise<UserRecord | null> {
    return await this._prisma.userRecord.findUnique({
      where: {
        id: query.userId
      }
    });
  }
}
