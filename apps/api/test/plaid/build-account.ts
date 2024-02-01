import { AccountBase, AccountType } from 'plaid';
import { buildBalance } from './build-balance';
import { v4 as uuid } from 'uuid';

export const buildAccount = (
  overrides: Partial<AccountBase> = {}
): AccountBase => {
  const account: AccountBase = {
    account_id: uuid(),
    balances: buildBalance(),
    mask: null,
    name: '',
    official_name: null,
    type: AccountType.Depository,
    subtype: null,
    ...overrides
  };

  return account;
};
