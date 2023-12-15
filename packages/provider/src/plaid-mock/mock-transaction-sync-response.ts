import {
  RemovedTransaction,
  Transaction,
  TransactionPaymentChannelEnum,
  TransactionsSyncResponse
} from 'plaid';

const createMockTransaction = (id: string): Transaction => {
  return {
    transaction_id: id,
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
};

const mockAddedTransactions = [
  'MOCK_ADDED_TRANSACTION_ID_1',
  'MOCK_ADDED_TRANSACTION_ID_2',
  'MOCK_ADDED_TRANSACTION_ID_3',
  'MOCK_ADDED_TRANSACTION_ID_4',
  'MOCK_ADDED_TRANSACTION_ID_5',
  'MOCK_ADDED_TRANSACTION_ID_6',
  'MOCK_ADDED_TRANSACTION_ID_7',
  'MOCK_ADDED_TRANSACTION_ID_8',
  'MOCK_ADDED_TRANSACTION_ID_9',
  'MOCK_ADDED_TRANSACTION_ID_10',
  'MOCK_ADDED_TRANSACTION_ID_11',
  'MOCK_ADDED_TRANSACTION_ID_12',
  'MOCK_ADDED_TRANSACTION_ID_13',
  'MOCK_ADDED_TRANSACTION_ID_14',
  'MOCK_ADDED_TRANSACTION_ID_15'
].map((id) => createMockTransaction(id));

const mockModifiedTransaction: Transaction = createMockTransaction(
  'MOCK_MODIFIED_TRANSACTION_ID'
);

const mockRemovedTransaction: RemovedTransaction = {
  transaction_id: 'MOCK_REMOVED_TRANSACTION_ID'
};

export const mockTransactionsSyncResponse: TransactionsSyncResponse = {
  added: mockAddedTransactions,
  modified: [mockModifiedTransaction],
  removed: [mockRemovedTransaction],
  has_more: false,
  next_cursor: '',
  request_id: ''
};
