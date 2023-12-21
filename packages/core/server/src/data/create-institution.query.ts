import { AccountRecordType } from '@prisma/client';
import { CreateTransactionQuery } from './create-transaction.query';

export interface CreateAccountQuery {
  externalId: string;
  current: number;
  available: number;
  currency: string | null;
  type: AccountRecordType;
  transactions: CreateTransactionQuery[];
}

export interface CreateInstitutionQuery {
  userId: string;
  plaidAccessToken: string;
  accounts: CreateAccountQuery[];
}
