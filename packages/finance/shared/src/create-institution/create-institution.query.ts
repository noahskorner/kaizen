import { CreateAccountQuery } from './create-account.query';

export interface CreateInstitutionQuery {
  userId: string;
  plaidAccessToken: string;
  accounts: CreateAccountQuery[];
}
