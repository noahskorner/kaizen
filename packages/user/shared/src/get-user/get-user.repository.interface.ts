import { UserRecord } from '../user-record';
import { GetUserQuery } from './get-user.query';

export interface IGetUserRepository {
  get(query: GetUserQuery): Promise<UserRecord | null>;
}
