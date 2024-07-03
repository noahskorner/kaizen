// eslint-disable-next-line no-restricted-imports
import { AccountHistoryRecord as PrismaAccountHistoryRecord } from '@prisma/client';
import { AccountRecordType } from './account-record-type';
import { AccountRecordSubtype } from './account-record-subtype';
import { AccountRecordVerificationStatus } from './account-record-verification-status';

export type AccountHistoryRecord = Omit<
  PrismaAccountHistoryRecord,
  'type' | 'subtype' | 'verificationStatus'
> & {
  type: AccountRecordType;
  subtype: AccountRecordSubtype | null;
  verificationStatus: AccountRecordVerificationStatus | null;
};
