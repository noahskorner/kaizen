import { Institution } from '../institution';

export interface SyncAccountsResponse {
  /** A map of institutions and accounts that were successfully synced. */
  succeeded: Institution[];
  /** A list of institutions whose accounts failed to sync. */
  failed: string[];
}
