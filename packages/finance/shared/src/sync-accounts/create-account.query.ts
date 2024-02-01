import { AccountRecordType } from '../account-record-type';

export interface CreateAccountQuery {
  institutionId: string;
  externalId: string;
  current: number;
  available: number;
  currency: string | null;
  type: AccountRecordType;
}
