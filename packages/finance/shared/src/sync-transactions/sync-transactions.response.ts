import { Transaction } from '../transaction';

export interface SyncTransactionsResponse {
  /** A list of institutions whose transactions were successfully synced. */
  succeeded: string[];
  /** A list of institutions whose transactions failed to sync. */
  failed: string[];
  created: Transaction[];
  updated: Transaction[];
  deleted: Transaction[];
}
