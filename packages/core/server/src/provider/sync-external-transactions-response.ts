import { ExternalTransaction } from './external-transaction';

export interface SyncExternalTransactionsResponse {
  added: ExternalTransaction[];
  modified: ExternalTransaction[];
  removed: string[];
}
