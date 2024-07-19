import { User } from './user';
import { UserRecord } from './user-record';

export class UserAdapter {
  public static toUser(record: UserRecord): User {
    const user: User = {
      id: record.id,
      email: record.email
    };
    return user;
  }
}
