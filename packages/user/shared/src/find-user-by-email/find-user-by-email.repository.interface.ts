import { UserRecord } from '../user-record';
import { FindUserByEmailQuery } from './find-user-by-email.query';

export interface IFindUserByEmailRepository {
  find(query: FindUserByEmailQuery): Promise<UserRecord | null>;
}
