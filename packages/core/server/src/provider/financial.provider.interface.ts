import { ApiResponse } from '@kaizen/core';
import { ExternalAccount } from './external-account';
import { SyncExternalTransactionsResponse } from './sync-external-transactions-response';

export interface IFinancialProvider {
  createExternalLinkToken: (userId: string) => Promise<ApiResponse<string>>;
  exchangeExternalPublicToken: (
    publicToken: string
  ) => Promise<ApiResponse<string>>;
  getExternalAccounts: (
    accessToken: string
  ) => Promise<ApiResponse<ExternalAccount[]>>;
  syncExternalTransactions(
    accessToken: string
  ): Promise<ApiResponse<SyncExternalTransactionsResponse>>;
}
