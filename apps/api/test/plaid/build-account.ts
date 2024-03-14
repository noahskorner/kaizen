import {
  AccountBase,
  AccountType,
  AccountSubtype,
  AccountBaseVerificationStatusEnum
} from 'plaid';
import { v4 as uuid } from 'uuid';
import { getRandomEnum } from '../get-random-enum';

export const buildAccount = (
  overrides: Partial<AccountBase> = {}
): AccountBase => {
  const account: AccountBase = {
    account_id: uuid(),
    balances: {
      available: parseFloat((Math.random() * 1000).toFixed(2)),
      current: parseFloat((Math.random() * 1000).toFixed(2)),
      limit: parseFloat((Math.random() * 1000).toFixed(2)),
      iso_currency_code: uuid(),
      unofficial_currency_code: uuid(),
      last_updated_datetime: new Date().toISOString()
    },
    mask: uuid(),
    name: uuid(),
    official_name: uuid(),
    type: getRandomEnum(AccountType),
    subtype: getRandomEnum(AccountSubtype),
    verification_status: getRandomEnum(AccountBaseVerificationStatusEnum),
    persistent_account_id: uuid(),
    ...overrides
  };

  return account;
};
