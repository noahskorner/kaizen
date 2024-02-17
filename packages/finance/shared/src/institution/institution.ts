import { Account } from '../account/account';

export interface Institution {
  id: string;
  userId: string;
  accounts: Account[];
}
