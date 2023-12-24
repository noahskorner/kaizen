import { UserRecord } from '../user.record';
import { CreateUserQuery } from './create-user.query';

export interface ICreateUserRepository {
  create: (query: CreateUserQuery) => Promise<UserRecord>;
}
