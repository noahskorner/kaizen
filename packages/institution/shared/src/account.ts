import { AccountType } from './account-type';
import { Balance } from './balance';

export interface Account {
  id: string;
  externalId: string;
  type: AccountType;
  balance: Balance;
}
