import { Repository } from '@kaizen/core-server';
import {
  IUpdateEmailRepository,
  UserRecord,
  UpdateEmailQuery
} from '@kaizen/user';

export class UpdateEmailRepository
  extends Repository
  implements IUpdateEmailRepository
{
  public async update(query: UpdateEmailQuery): Promise<UserRecord> {
    return this._prisma.userRecord.update({
      where: {
        id: query.userId
      },
      data: {
        email: query.normalizedEmail
      }
    });
  }
}
