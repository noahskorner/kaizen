import { AccountRecordSubtype } from '../account-record-subtype';
import { AccountRecordType } from '../account-record-type';
import { AccountRecordVerificationStatus } from '../account-record-verification-status';

export interface CreateAccountQuery {
  institutionId: string;
  externalId: string;
  available: number | null;
  current: number | null;
  limit: number | null;
  isoCurrencyCode: string | null;
  unofficialCurrencyCode: string | null;
  externalUpdatedAt: string | null;
  mask: string | null;
  name: string;
  officialName: string | null;
  type: AccountRecordType;
  subtype: AccountRecordSubtype | null;
  verificationStatus: AccountRecordVerificationStatus | null;
}
