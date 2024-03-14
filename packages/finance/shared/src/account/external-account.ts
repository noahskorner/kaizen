import { ExternalAccountSubtype } from './external-account-subtype';
import { ExternalAccountType } from './external-account-type';
import { ExternalAccountVerificationStatus } from './external-account-verification-status';

export interface ExternalAccount {
  externalAccountId: string;
  available: number | null;
  current: number | null;
  limit: number | null;
  isoCurrencyCode: string | null;
  unofficialCurrencyCode: string | null;
  externalUpdatedAt: string | null;
  mask: string | null;
  name: string;
  officialName: string | null;
  type: ExternalAccountType;
  subtype: ExternalAccountSubtype | null;
  verificationStatus: ExternalAccountVerificationStatus | null;
}
