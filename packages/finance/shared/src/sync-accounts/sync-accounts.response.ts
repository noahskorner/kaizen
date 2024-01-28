import { Account } from '../account';

export interface SyncAccountsResponse {
  /** A map of institutions and accounts that were successfully synced. */
  succeeded: Map<string, Account[]>;
  /** A list of institutions whose accounts failed to sync. */
  failed: string[];
}
