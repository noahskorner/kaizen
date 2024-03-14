// eslint-disable-next-line no-restricted-imports
import { AccountRecord as PrismaAccountRecord } from '@prisma/client';
import { AccountRecordType } from './account-record-type';
import { AccountRecordSubtype } from './account-record-subtype';
import { AccountRecordVerificationStatus } from './account-record-verification-status';

export type AccountRecord = Omit<
  PrismaAccountRecord,
  'type' | 'subtype' | 'verificationStatus'
> & {
  type: AccountRecordType;
  subtype: AccountRecordSubtype | null;
  verificationStatus: AccountRecordVerificationStatus | null;
};
