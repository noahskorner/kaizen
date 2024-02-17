import { Paginated } from '@kaizen/core';
import { FindTransactionsQuery } from './find-transactions.query';
import { TransactionRecord } from '../transaction-record';

export interface IFindTransactionsRepository {
  find(query: FindTransactionsQuery): Promise<Paginated<TransactionRecord>>;
}
