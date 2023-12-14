/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';
import {
  LinkTokenCreateResponse,
  ItemPublicTokenExchangeResponse,
  Item,
  ItemUpdateTypeEnum,
  AccountBalance,
  AccountBase,
  AccountType,
  AccountsGetResponse,
  PlaidApi,
  TransactionsSyncResponse,
  Transaction,
  TransactionPaymentChannelEnum,
  RemovedTransaction
} from 'plaid';

const mockAxiosHeaders: any = {};

const mockAxiosResponse: Omit<AxiosResponse<unknown, unknown>, 'data'> = {
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {
    headers: mockAxiosHeaders
  }
};

const mockLinkTokenCreateResponse: LinkTokenCreateResponse = {
  link_token: 'MOCK_LINK_TOKEN',
  expiration: '',
  request_id: ''
};

const mockItemPublicTokenExchangeResponse: ItemPublicTokenExchangeResponse = {
  access_token: 'MOCK_ACCESS_TOKEN',
  item_id: 'MOCK_ITEM_ID',
  request_id: ''
};

const mockItem: Item = {
  item_id: 'MOCK_ITEM_ID',
  webhook: null,
  error: null,
  available_products: [],
  billed_products: [],
  consent_expiration_time: null,
  update_type: ItemUpdateTypeEnum.Background
};

const mockBalances: AccountBalance = {
  available: 75,
  current: 100,
  limit: null,
  iso_currency_code: null,
  unofficial_currency_code: null
};

const mockAccount: AccountBase = {
  account_id: 'MOCK_ACCOUNT_ID',
  balances: mockBalances,
  mask: null,
  name: '',
  official_name: null,
  type: AccountType.Depository,
  subtype: null
};

const mockAccountsGetResponse: AccountsGetResponse = {
  accounts: [mockAccount],
  item: mockItem,
  request_id: ''
};

const mockAddedTransaction: Transaction = {
  transaction_id: 'MOCK_ADDED_TRANSACTION_ID',
  account_id: 'MOCK_ACCOUNT_ID',
  amount: 0,
  iso_currency_code: null,
  unofficial_currency_code: null,
  category: null,
  category_id: null,
  date: '',
  location: {
    address: null,
    city: null,
    region: null,
    postal_code: null,
    country: null,
    lat: null,
    lon: null,
    store_number: null
  },
  name: '',
  payment_meta: {
    reference_number: null,
    ppd_id: null,
    payee: null,
    by_order_of: null,
    payer: null,
    payment_method: null,
    payment_processor: null,
    reason: null
  },
  pending: false,
  pending_transaction_id: null,
  account_owner: null,
  authorized_date: null,
  authorized_datetime: null,
  datetime: null,
  payment_channel: TransactionPaymentChannelEnum.Online,
  transaction_code: null
};

const mockModifiedTransaction: Transaction = {
  ...mockAddedTransaction,
  transaction_id: 'MOCK_MODIFIED_TRANSACTION_ID'
};

const mockRemovedTransaction: RemovedTransaction = {
  transaction_id: 'MOCK_REMOVED_TRANSACTION_ID'
};

const mockTransactionsSyncResponse: TransactionsSyncResponse = {
  added: [mockAddedTransaction],
  modified: [mockModifiedTransaction],
  removed: [mockRemovedTransaction],
  has_more: false,
  next_cursor: '',
  request_id: ''
};

const mockPlaidApiImplementation: Pick<
  PlaidApi,
  | 'linkTokenCreate'
  | 'itemPublicTokenExchange'
  | 'accountsGet'
  | 'transactionsSync'
> = {
  linkTokenCreate: jest.fn().mockResolvedValue({
    ...mockAxiosResponse,
    data: mockLinkTokenCreateResponse
  }),
  itemPublicTokenExchange: jest.fn().mockResolvedValue({
    ...mockAxiosResponse,
    data: mockItemPublicTokenExchangeResponse
  }),
  accountsGet: jest.fn().mockResolvedValue({
    ...mockAxiosResponse,
    data: mockAccountsGetResponse
  }),
  transactionsSync: jest.fn().mockResolvedValue({
    ...mockAxiosResponse,
    data: mockTransactionsSyncResponse
  })
};

export const mockPlaidApi = mockPlaidApiImplementation as PlaidApi;
