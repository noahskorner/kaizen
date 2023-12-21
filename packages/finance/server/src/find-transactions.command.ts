import { FindTransactionsRequest } from '@kaizen/finance';

export interface FindTransactionsCommand extends FindTransactionsRequest {
  userId: string;
}
