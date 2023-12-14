import { AccountType } from './account-type';
import { Balance } from './balance';
import { Transaction } from './transaction';

export interface Account {
  id: string;
  externalId: string;
  type: AccountType;
  balance: Balance;
  transactions: Transaction[];
}
