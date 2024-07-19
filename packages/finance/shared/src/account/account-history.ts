import { AccountSubtype } from './account-subtype';
import { AccountType } from './account-type';
import { AccountVerificationStatus } from './account-verification-status';

export interface AccountHistory {
  id: string;
  createdAt: string;
  snapshotId: string;
  accountId: string;
  externalId: string;
  available: number | null;
  current: number | null;
  limit: number | null;
  isoCurrencyCode: string | null;
  unofficialCurrencyCode: string | null;
  mask: string | null;
  name: string;
  officialName: string | null;
  type: AccountType;
  subtype: AccountSubtype | null;
  verificationStatus: AccountVerificationStatus | null;
}
