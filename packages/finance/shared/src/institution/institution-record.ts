// eslint-disable-next-line no-restricted-imports
import { InstitutionRecord as PrismaInstitutionRecord } from '@prisma/client';
import { AccountRecord } from '../account/account-record';

export type InstitutionRecord = PrismaInstitutionRecord & {
  accounts: AccountRecord[];
};
