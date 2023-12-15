import { FindTransactionsRequest } from '@kaizen/institution';

export interface FindTransactionsCommand extends FindTransactionsRequest {
  userId: string;
}
