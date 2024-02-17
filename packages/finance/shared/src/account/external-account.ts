import { ExternalAccountType } from './external-account-type';

export interface ExternalAccount {
  id: string;
  type: ExternalAccountType;
  current: number;
  available: number;
  currency: string | null;
}
