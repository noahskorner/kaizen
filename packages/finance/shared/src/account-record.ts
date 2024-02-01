// eslint-disable-next-line no-restricted-imports
import { AccountRecord as PrismaAccountRecord } from '@prisma/client';
import { AccountRecordType } from './account-record-type';

export type AccountRecord = Omit<PrismaAccountRecord, 'type'> & {
  type: AccountRecordType;
};
