export interface SyncTransactionsCommand {
  userId: string;
  /** List of institutions to sync. If none are provided, all institution's transactions will be synced. */
  institutionIds?: string[];
}
