import {
  CountryCode,
  AccountsGetRequest,
  ItemPublicTokenExchangeRequest,
  LinkTokenCreateRequest,
  PlaidApi,
  Products,
  TransactionsSyncRequest
} from 'plaid';
import { ErrorCode, ServiceResponse } from '@kaizen/core';
import {
  ExternalAccount,
  ExternalAccountAdapter,
  ExternalTransactionAdapter,
  IFinancialProvider,
  SyncExternalTransactionsResponse
} from '@kaizen/finance';
import { Service } from '@kaizen/core-server';

export class PlaidFinancialProvider
  extends Service
  implements IFinancialProvider
{
  constructor(private readonly _plaid: PlaidApi) {
    super();
  }

  public async createExternalLinkToken(
    userId: string
  ): Promise<ServiceResponse<string>> {
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
      const response = await this._plaid.linkTokenCreate(request);

      if (response.status !== 200) {
        return this.failure({
          code: ErrorCode.FINANCIAL_PROVIDER_LINK_TOKEN_CREATE,
          params: { userId, response }
        });
      }

      return this.success(response.data.link_token);
    } catch (error) {
      console.log(error);
      return this.failure({
        code: ErrorCode.FINANCIAL_PROVIDER_LINK_TOKEN_CREATE,
        params: { userId, error }
      });
    }
  }

  public async exchangeExternalPublicToken(
    publicToken: string
  ): Promise<ServiceResponse<string>> {
    try {
      const request: ItemPublicTokenExchangeRequest = {
        public_token: publicToken
      };
      const response = await this._plaid.itemPublicTokenExchange(request);

      if (response.status !== 200) {
        return this.failure({
          code: ErrorCode.FINANCIAL_PROVIDER_EXCHANGE_PUBLIC_TOKEN,
          params: { publicToken, response }
        });
      }

      return this.success(response.data.access_token);
    } catch (error) {
      console.log(error);
      return this.failure({
        code: ErrorCode.FINANCIAL_PROVIDER_EXCHANGE_PUBLIC_TOKEN,
        params: { publicToken, error }
      });
    }
  }

  public async getExternalAccounts(
    accessToken: string
  ): Promise<ServiceResponse<ExternalAccount[]>> {
    try {
      const request: AccountsGetRequest = {
        access_token: accessToken
      };
      const response = await this._plaid.accountsBalanceGet(request);

      if (response.status !== 200) {
        return this.failure({
          code: ErrorCode.FINANCIAL_PROVIDER_GET_EXTERNAL_ACCOUNTS,
          params: { accessToken, response }
        });
      }

      return this.success(
        response.data.accounts.map(ExternalAccountAdapter.toExternalAccount)
      );
    } catch (error) {
      console.log(error);
      return this.failure({
        code: ErrorCode.FINANCIAL_PROVIDER_GET_EXTERNAL_ACCOUNTS,
        params: { accessToken, error }
      });
    }
  }

  public async syncExternalTransactions(
    accessToken: string,
    cursor: string | null = null
  ): Promise<ServiceResponse<SyncExternalTransactionsResponse>> {
    try {
      const request: TransactionsSyncRequest = {
        access_token: accessToken,
        cursor: cursor ?? undefined
      };
      const transactionsSyncReponse =
        await this._plaid.transactionsSync(request);

      if (transactionsSyncReponse.status !== 200) {
        return this.failure({
          code: ErrorCode.FINANCIAL_PROVIDER_SYNC_EXTERNAL_TRANSACTIONS,
          params: { accessToken, cursor, response: transactionsSyncReponse }
        });
      }

      const response: SyncExternalTransactionsResponse = {
        hasMore: transactionsSyncReponse.data.has_more,
        cursor: transactionsSyncReponse.data.next_cursor,
        created: transactionsSyncReponse.data.added.map(
          ExternalTransactionAdapter.toExternalTransaction
        ),
        updated: transactionsSyncReponse.data.modified.map(
          ExternalTransactionAdapter.toExternalTransaction
        ),
        deleted: transactionsSyncReponse.data.removed.reduce(
          ExternalTransactionAdapter.toRemovedTransaction,
          []
        )
      };

      return this.success(response);
    } catch (error) {
      console.log(error);
      return this.failure({
        code: ErrorCode.FINANCIAL_PROVIDER_SYNC_EXTERNAL_TRANSACTIONS,
        params: { accessToken, cursor, error }
      });
    }
  }
}
