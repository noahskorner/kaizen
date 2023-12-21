import { AccountType } from './account-type';

export interface Account {
  id: string;
  externalId: string;
  type: AccountType;
  current: number;
  available: number;
  currency: string | null;
}
