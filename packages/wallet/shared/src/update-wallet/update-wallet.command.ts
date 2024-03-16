export interface UpdateWalletCommand {
  userId: string;
  /** Idempotent transaction id. */
  transactionId: string;
  /** Amount to update the wallet by.
   * Positive number will increase the wallet balance.
   * Negative number will decrease the wallet balance.
   */
  amount: number;
}
