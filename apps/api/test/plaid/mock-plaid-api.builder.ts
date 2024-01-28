import {
  LinkTokenCreateResponse,
  ItemPublicTokenExchangeResponse,
  TransactionsSyncResponse,
  AccountsGetResponse,
  PlaidApi
} from 'plaid';
import { mockAxiosSuccessResponse } from '../mock-axios-success-response';

export class MockPlaidApiBuilder {
  private readonly _plaidApi: Partial<PlaidApi> = {};

  public build(): PlaidApi {
    return this._plaidApi as PlaidApi;
  }

  public withLinkTokenCreate(
    response: LinkTokenCreateResponse
  ): MockPlaidApiBuilder {
    this._plaidApi.linkTokenCreate = jest.fn().mockResolvedValue({
      ...mockAxiosSuccessResponse,
      data: response
    });

    return this;
  }

  public withItemPublicTokenExchange(
    response: ItemPublicTokenExchangeResponse
  ): MockPlaidApiBuilder {
    this._plaidApi.itemPublicTokenExchange = jest.fn().mockResolvedValue({
      ...mockAxiosSuccessResponse,
      data: response
    });

    return this;
  }

  public withAccountsBalanceGet(
    response: AccountsGetResponse
  ): MockPlaidApiBuilder {
    this._plaidApi.accountsBalanceGet = jest.fn().mockResolvedValue({
      ...mockAxiosSuccessResponse,
      data: response
    });

    return this;
  }

  public withTransactionsSync(
    response: TransactionsSyncResponse
  ): MockPlaidApiBuilder {
    this._plaidApi.transactionsSync = jest.fn().mockResolvedValue({
      ...mockAxiosSuccessResponse,
      data: response
    });

    return this;
  }
}
