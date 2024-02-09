import { ServiceResponse } from '@kaizen/core';
import { ExternalAccount } from './external-account';
import { SyncExternalTransactionsResponse } from './sync-external-transactions-response';

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
