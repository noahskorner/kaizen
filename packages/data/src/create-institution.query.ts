import { AccountRecordType } from '@prisma/client';

export interface CreateAccountQuery {
  externalId: string;
  current: number;
  available: number;
  type: AccountRecordType;
}

export interface CreateInstitutionQuery {
  userId: string;
  plaidAccessToken: string;
  accounts: CreateAccountQuery[];
}
