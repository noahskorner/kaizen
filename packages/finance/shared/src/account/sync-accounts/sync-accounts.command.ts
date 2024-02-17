export interface SyncAccountsCommand {
  userId: string;
  /** List of institutions to sync. If not provided, all institution's accounts will be synced. */
  institutionIds?: string[];
}
