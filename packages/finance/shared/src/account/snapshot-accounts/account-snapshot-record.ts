// eslint-disable-next-line no-restricted-imports
import { AccountSnapshotRecord as PrismaAccountSnapshotRecord } from '@prisma/client';
import { AccountRecordType } from '../account-record-type';
import { AccountRecordSubtype } from '../account-record-subtype';
import { AccountRecordVerificationStatus } from '../account-record-verification-status';

export type AccountSnapshotRecord = Omit<
  PrismaAccountSnapshotRecord,
  'type' | 'subtype' | 'verificationStatus'
> & {
  type: AccountRecordType;
  subtype: AccountRecordSubtype | null;
  verificationStatus: AccountRecordVerificationStatus | null;
};
