import { ExternalAccountType } from './external-account-type';
import { ExternalBalance } from './external-balance';

export interface ExternalAccount {
  id: string;
  type: ExternalAccountType;
  balance: ExternalBalance;
}
