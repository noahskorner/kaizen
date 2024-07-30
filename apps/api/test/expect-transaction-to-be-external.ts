import { Transaction, Location } from '@kaizen/finance';
import {
  Transaction as PlaidTransaction,
  Location as PlaidLocation
} from 'plaid';

const expectLocationToBeExternal = (
  location: Location,
  external: PlaidLocation
) => {
  expect(location.id).toBeDefined();
  expect(location.address).toBe(external.address);
  expect(location.city).toBe(external.city);
  expect(location.region).toBe(external.region);
  expect(location.postalCode).toBe(external.postal_code);
  expect(location.country).toBe(external.country);
  expect(location.lat).toBe(external.lat);
  expect(location.lon).toBe(external.lon);
  expect(location.storeNumber).toBe(external.store_number);
};

export const expectTransactionToBeExternal = (
  transaction: Transaction,
  external: PlaidTransaction
) => {
  expect(transaction.id).toBeDefined();
  expect(transaction.userId).toBeDefined();
  expect(transaction.institutionId).toBeDefined();
  expect(transaction.accountId).toBeDefined();
  expect(transaction.externalId).toBe(external.transaction_id);
  expect(transaction.externalAccountId).toBe(external.account_id);
  expectLocationToBeExternal(transaction.location, external.location);
  expect(transaction.originalAmount).toBe(external.amount);
  expect(transaction.isoCurrencyCode).toBe(external.iso_currency_code);
  expect(transaction.unofficialCurrencyCode).toBe(
    external.unofficial_currency_code
  );
  expect(transaction.checkNumber).toBe(external.check_number);
  expect(transaction.date).toBe(new Date(external.date).toISOString());
  expect(transaction.originalName).toBe(external.name);
  expect(transaction.originalMerchantName).toBe(external.merchant_name);
  expect(transaction.originalDescription).toBe(external.original_description);
  expect(transaction.pending).toBe(external.pending);
  expect(transaction.pendingTransactionId).toBe(
    external.pending_transaction_id
  );
  expect(transaction.accountOwner).toBe(external.account_owner);
  expect(transaction.logoUrl).toBe(external.logo_url);
  expect(transaction.website).toBe(external.website);
  if (external.authorized_date == null) {
    expect(transaction.authorizedDate).toBeNull();
  } else {
    expect(transaction.authorizedDate).toBe(
      new Date(external.authorized_date).toISOString()
    );
  }
  expect(transaction.authorizedDatetime).toBe(external.authorized_datetime);
  expect(transaction.datetime).toBe(external.datetime);
  expect(transaction.paymentChannel).toBe(external.payment_channel);
  expect(transaction.code).toBe(external.transaction_code);
  expect(transaction.merchantEntityId).toBe(external.merchant_entity_id);
  expect(transaction.originalCategory).toBe(
    external.personal_finance_category?.primary
  );
  expect(transaction.originalDetailed).toBe(
    external.personal_finance_category?.detailed
  );
  expect(transaction.originalConfidenceLevel).toBe(
    external.personal_finance_category?.confidence_level
  );
  expect(transaction.originalIconUrl).toBe(
    external.personal_finance_category_icon_url
  );
};
