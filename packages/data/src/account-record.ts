import { AccountRecord as PrismaAccountRecord } from '@prisma/client';
import { TransactionRecord } from './transaction-record';

export type AccountRecord = PrismaAccountRecord & {
  transactions: TransactionRecord[];
};
