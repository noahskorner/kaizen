import {
  Transaction,
  TransactionPaymentChannelEnum,
  TransactionCode,
  TransactionTransactionTypeEnum
} from 'plaid';
import { v4 as uuid } from 'uuid';
import { getRandomDate } from '../get-random-date';
import { getRandomBoolean } from '../get-random-boolean';

export const buildTransaction = (
  overrides: Partial<Transaction> = {}
): Transaction => {
  return {
    account_id: uuid(),
    amount: parseFloat((Math.random() * 1000).toFixed(2)),
    iso_currency_code: uuid(),
    unofficial_currency_code: uuid(),
    category: [],
    category_id: null,
    check_number: uuid(),
    // PlaidApi returns it in the format "YYYY-MM-DD"
    date: getRandomDate().toISOString().slice(0, 10),
    location: {
      address: uuid(),
      city: uuid(),
      region: uuid(),
      postal_code: uuid(),
      country: uuid(),
      lat: parseFloat((Math.random() * 1000).toFixed(2)),
      lon: parseFloat((Math.random() * 1000).toFixed(2)),
      store_number: uuid()
    },
    name: uuid(),
    merchant_name: uuid(),
    original_description: uuid(),
    payment_meta: {
      reference_number: uuid(),
      ppd_id: uuid(),
      payee: uuid(),
      by_order_of: uuid(),
      payer: uuid(),
      payment_method: uuid(),
      payment_processor: uuid(),
      reason: uuid()
    },
    pending: getRandomBoolean(),
    pending_transaction_id: uuid(),
    account_owner: uuid(),
    transaction_id: uuid(),
    transaction_type: TransactionTransactionTypeEnum.Digital,
    logo_url: uuid(),
    website: uuid(),
    // PlaidApi returns it in the format "YYYY-MM-DD"
    authorized_date: getRandomDate().toISOString().slice(0, 10),
    authorized_datetime: getRandomDate().toISOString(),
    datetime: getRandomDate().toISOString(),
    payment_channel: TransactionPaymentChannelEnum.Online,
    personal_finance_category: {
      primary: uuid(),
      detailed: uuid(),
      confidence_level: uuid()
    },
    transaction_code: TransactionCode.Adjustment,
    personal_finance_category_icon_url: uuid(),
    counterparties: undefined,
    merchant_entity_id: uuid(),
    ...overrides
  };
};
