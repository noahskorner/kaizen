import { Account } from '@kaizen/finance';

export interface AccountGroup {
  available: number;
  current: number;
  accounts: Account[];
}
