import { AccountSnapshot } from '@kaizen/finance';
import { AccountBase } from 'plaid';

export const expectAccountSnapshotToBeExternal = (
  actual: AccountSnapshot,
  expected: AccountBase
) => {
  expect(actual.id).toBeDefined();
  expect(expected.account_id).toBe(actual.externalId);
  expect(expected.balances.available).toBe(actual.available);
  expect(expected.balances.current).toBe(actual.current);
  expect(expected.balances.limit).toBe(actual.limit);
  expect(expected.balances.iso_currency_code).toBe(actual.isoCurrencyCode);
  expect(expected.balances.unofficial_currency_code).toBe(
    actual.unofficialCurrencyCode
  );
  expect(expected.mask).toBe(actual.mask);
  expect(expected.name).toBe(actual.name);
  expect(expected.official_name).toBe(actual.officialName);
  expect(expected.type).toBe(actual.type);
  expect(expected.subtype).toBe(actual.subtype);
  expect(expected.verification_status).toBe(actual.verificationStatus);
};
