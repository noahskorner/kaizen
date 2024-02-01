import { Transaction, TransactionPaymentChannelEnum } from 'plaid';
import { v4 as uuid } from 'uuid';

export const buildTransaction = (
  overrides: Partial<Transaction> = {}
): Transaction => {
  return {
    transaction_id: uuid(),
    account_id: uuid(),
    amount: 100,
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
    authorized_datetime: new Date().toISOString(),
    datetime: null,
    payment_channel: TransactionPaymentChannelEnum.Online,
    transaction_code: null,
    ...overrides
  };
};
