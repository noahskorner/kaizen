import { AccountRecordType } from '../account-record-type';
import { CreateTransactionQuery } from '../sync-transactions/create-transaction.query';

export interface CreateAccountQuery {
  externalId: string;
  current: number;
  available: number;
  currency: string | null;
  type: AccountRecordType;
  transactions: CreateTransactionQuery[];
}
