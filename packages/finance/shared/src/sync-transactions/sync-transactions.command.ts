import { SyncAllTransactionsCommand } from './sync-all-transactions.command';

export interface SyncTransactionsCommand extends SyncAllTransactionsCommand {
  institutionId: string;
}
