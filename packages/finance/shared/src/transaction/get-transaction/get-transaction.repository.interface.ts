import { TransactionRecord } from '../transaction-record';
import { GetTransactionQuery } from './get-transaction.query';
import { GetTransactionByExternalIdQuery } from './get-transaction-by-external-id.query';

export interface IGetTransactionRepository {
  get(query: GetTransactionQuery): Promise<TransactionRecord | null>;
  getByExternalId(
    query: GetTransactionByExternalIdQuery
  ): Promise<TransactionRecord | null>;
}
