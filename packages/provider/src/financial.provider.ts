import {
  CountryCode,
  AccountsGetRequest,
  ItemPublicTokenExchangeRequest,
  LinkTokenCreateRequest,
  PlaidApi,
  Products,
  AccountBase,
  AccountType
} from 'plaid';
import { ApiResponse, Errors, Service } from '@kaizen/core';
import { ExternalAccount, ExternalAccountType } from './external-account';

export interface IFinancialProvider {
  createExternalLinkToken(userId: string): Promise<ApiResponse<string>>;
  exchangeExternalPublicToken(
    publicToken: string
  ): Promise<ApiResponse<string>>;
  getExternalAccounts(
    accessToken: string
  ): Promise<ApiResponse<ExternalAccount[]>>;
}

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

      return this.success(response.data.accounts.map(this.toExternalAccount));
    } catch (error) {
      console.log(error);
      return this.failure(Errors.INTERNAL_SERVER_ERROR);
    }
  }

  private toExternalAccount(account: AccountBase): ExternalAccount {
    const externalAccount: ExternalAccount = {
      id: account.account_id,
      type: this.toExternalAccountType(account.type),
      balance: {
        current: account.balances.current ?? 0,
        available: account.balances.available ?? 0
      }
    };
    return externalAccount;
  }

  private toExternalAccountType(type: AccountType): ExternalAccountType {
    switch (type) {
      case AccountType.Credit:
        return ExternalAccountType.Credit;
      case AccountType.Depository:
        return ExternalAccountType.Depository;
      case AccountType.Investment:
        return ExternalAccountType.Investment;
      case AccountType.Loan:
        return ExternalAccountType.Loan;
      case AccountType.Other:
        return ExternalAccountType.Other;
      default:
        return ExternalAccountType.Other;
    }
  }
}
