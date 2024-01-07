import { FindTransactionsRequest } from './find-transactions.request';

export interface FindTransactionsCommand extends FindTransactionsRequest {
  userId: string;
}
