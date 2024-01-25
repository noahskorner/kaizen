import { CreateTransactionQuery } from './create-transaction.query';

export interface UpdateTransactionQuery extends CreateTransactionQuery {
  externalId: string;
}
