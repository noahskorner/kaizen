import { Account } from './account';

export interface Institution {
  id: string;
  userId: string;
  accounts: Account[];
}
