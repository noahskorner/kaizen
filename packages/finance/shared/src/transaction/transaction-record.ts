/* eslint-disable no-restricted-imports */
import {
  TransactionRecord as PrismaTransactionRecord,
  LocationRecord as PrismaLocationRecord,
  CategoryRecord as PrismaCategoryRecord
} from '@prisma/client';

export type TransactionRecord = PrismaTransactionRecord & {
  location: PrismaLocationRecord;
  category: PrismaCategoryRecord | null;
};
