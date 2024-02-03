import { AccountBalance } from 'plaid';

export const buildBalance = (
  overrides: Partial<AccountBalance> = {}
): AccountBalance => {
  return {
    available: 75,
    current: 100,
    limit: null,
    iso_currency_code: 'USD',
    unofficial_currency_code: null,
    ...overrides
  };
};
