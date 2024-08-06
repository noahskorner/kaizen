// eslint-disable-next-line no-restricted-imports
import { TransactionCategoryRecord as PrismaTransactionCategoryRecord } from '@prisma/client';
import { CategoryRecord } from '../category';

export type TransactionCategoryRecord = PrismaTransactionCategoryRecord & {
  category: CategoryRecord;
};
