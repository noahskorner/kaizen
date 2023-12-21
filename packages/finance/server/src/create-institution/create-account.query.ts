import { AccountRecordType } from '@kaizen/data';
import { CreateTransactionQuery } from './create-transaction.query';

export interface CreateAccountQuery {
  externalId: string;
  current: number;
  available: number;
  currency: string | null;
  type: AccountRecordType;
  transactions: CreateTransactionQuery[];
}
