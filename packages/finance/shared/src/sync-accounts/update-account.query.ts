import { CreateAccountQuery } from './create-account.query';

export interface UpdateAccountQuery extends CreateAccountQuery {
  id: string;
}
