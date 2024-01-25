import { ExternalTransaction } from './external-transaction';

export interface SyncExternalTransactionsResponse {
  hasMore: boolean;
  cursor: string;
  created: ExternalTransaction[];
  updated: ExternalTransaction[];
  deleted: string[];
}
