/* eslint-disable no-restricted-imports */
import {
  TransactionRecord as PrismaTransactionRecord,
  LocationRecord as PrismaLocationRecord
} from '@prisma/client';
import { TransactionCategoryRecord } from './transaction-category-record';

export type TransactionRecord = PrismaTransactionRecord & {
  location: PrismaLocationRecord;
  categories: TransactionCategoryRecord[];
};
