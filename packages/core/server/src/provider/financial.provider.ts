import {
  CountryCode,
  AccountsGetRequest,
  ItemPublicTokenExchangeRequest,
  LinkTokenCreateRequest,
  PlaidApi,
  Products,
  TransactionsSyncRequest
} from 'plaid';
import { ApiResponse, Errors } from '@kaizen/core';
import { ExternalAccount } from './external-account';
import { ExternalAccountAdapter } from './external-account.adapter';
import { ExternalTransactionAdapter } from './external-transaction.adapter';
import { SyncExternalTransactionsResponse } from './sync-external-transactions-response';
import { Service } from '../service';
import { IFinancialProvider } from './financial.provider.interface';

export class FinancialProvider extends Service implements IFinancialProvider {
  constructor(private readonly _plaidClient: PlaidApi) {
    super();
  }

  public async createExternalLinkToken(
    userId: string
  ): Promise<ApiResponse<string>> {
    try {
      const request: LinkTokenCreateRequest = {
        user: {
          client_user_id: userId
        },
        client_name: 'Kaizen',
        language: 'en',
        country_codes: [CountryCode.Us],
        products: [Products.Transactions]
      };
      const response = await this._plaidClient.linkTokenCreate(request);

      if (response.status !== 200) {
        return this.failure(Errors.INTERNAL_SERVER_ERROR);
      }

      return this.success(response.data.link_token);
    } catch (error) {
      console.log(error);
      return this.failure(Errors.INTERNAL_SERVER_ERROR);
    }
  }

  public async exchangeExternalPublicToken(
    publicToken: string
  ): Promise<ApiResponse<string>> {
    try {
      const request: ItemPublicTokenExchangeRequest = {
        public_token: publicToken
      };
      const response = await this._plaidClient.itemPublicTokenExchange(request);

      if (response.status !== 200) {
        return this.failure(Errors.INTERNAL_SERVER_ERROR);
      }

      return this.success(response.data.access_token);
    } catch (error) {
      console.log(error);
      return this.failure(Errors.INTERNAL_SERVER_ERROR);
    }
  }

  public async getExternalAccounts(
    accessToken: string
  ): Promise<ApiResponse<ExternalAccount[]>> {
    try {
      const request: AccountsGetRequest = {
        access_token: accessToken
      };
      const response = await this._plaidClient.accountsGet(request);

      return this.success(
        response.data.accounts.map(ExternalAccountAdapter.toExternalAccount)
      );
    } catch (error) {
      console.log(error);
      return this.failure(Errors.INTERNAL_SERVER_ERROR);
    }
  }

  public async syncExternalTransactions(
    accessToken: string
  ): Promise<ApiResponse<SyncExternalTransactionsResponse>> {
    try {
      const request: TransactionsSyncRequest = {
        access_token: accessToken
      };
      const response = await this._plaidClient.transactionsSync(request);

      const result: SyncExternalTransactionsResponse = {
        added: response.data.added.map(
          ExternalTransactionAdapter.toExternalTransaction
        ),
        modified: response.data.modified.map(
          ExternalTransactionAdapter.toExternalTransaction
        ),
        removed: [] // TODO: Handle removed transactions
      };
      return this.success(result);
    } catch (error) {
      console.log(error);
      return this.failure(Errors.INTERNAL_SERVER_ERROR);
    }
  }
}
