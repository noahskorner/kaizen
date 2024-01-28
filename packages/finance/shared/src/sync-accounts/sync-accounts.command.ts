export interface SyncAccountsCommand {
  userId: string;
  /**
   * List of institutionIds to sync. If not provided, all institutions will be synced.
   */
  institutionIds?: string[];
}
