import { AccountSubtype } from './account-subtype';
import { AccountType } from './account-type';
import { AccountVerificationStatus } from './account-verification-status';

export interface Account {
  id: string;
  createdAt: string;
  institutionId: string;
  externalId: string;
  available: number | null;
  current: number | null;
  limit: number | null;
  isoCurrencyCode: string | null;
  unofficialCurrencyCode: string | null;
  externalUpdatedAt: string | null;
  mask: string | null;
  name: string | null;
  officialName: string | null;
  type: AccountType;
  subtype: AccountSubtype | null;
  verificationStatus: AccountVerificationStatus | null;
}
