import { Repository } from '@kaizen/core-server';
import {
  IUpdatePasswordRepository,
  UpdatePasswordQuery,
  UserRecord
} from '@kaizen/user';

export class UpdatePasswordRepository
  extends Repository
  implements IUpdatePasswordRepository
{
  public update(query: UpdatePasswordQuery): Promise<UserRecord> {
    return this._prisma.userRecord.update({
      data: {
        password: query.hashedPassword
      },
      where: {
        id: query.userId
      }
    });
  }
}
