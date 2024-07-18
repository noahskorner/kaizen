import { UserRecord } from '../user-record';
import { UpdateEmailQuery } from './update-email.query';

export interface IUpdateEmailRepository {
  update(query: UpdateEmailQuery): Promise<UserRecord>;
}
