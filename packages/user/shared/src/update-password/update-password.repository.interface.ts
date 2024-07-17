import { UserRecord } from '../user-record';
import { UpdatePasswordQuery } from './update-password.query';

export interface IUpdatePasswordRepository {
  update(query: UpdatePasswordQuery): Promise<UserRecord>;
}
