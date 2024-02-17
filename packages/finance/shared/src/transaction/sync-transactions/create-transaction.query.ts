import { UpdateTransactionQuery } from './update-transaction.query';

export interface CreateTransactionQuery extends UpdateTransactionQuery {
  accountId: string;
}
