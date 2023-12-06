export interface CreateAccountQuery {
  externalId: string;
  current: number;
  available: number;
}

export interface CreateInstitutionQuery {
  userId: string;
  plaidAccessToken: string;
  accounts: CreateAccountQuery[];
}
