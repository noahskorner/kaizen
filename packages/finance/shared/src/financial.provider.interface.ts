import { ServiceResponse } from '@kaizen/core';
import { ExternalAccount } from './account/external-account';
import { SyncExternalTransactionsResponse } from './transaction/sync-external-transactions-response';

export interface IFinancialProvider {
  createExternalLinkToken: (userId: string) => Promise<ServiceResponse<string>>;
  exchangeExternalPublicToken: (
    publicToken: string
  ) => Promise<ServiceResponse<string>>;
  getExternalAccounts: (
    accessToken: string
  ) => Promise<ServiceResponse<ExternalAccount[]>>;
  syncExternalTransactions(
    accessToken: string,
    cursor: string | null
  ): Promise<ServiceResponse<SyncExternalTransactionsResponse>>;
}
