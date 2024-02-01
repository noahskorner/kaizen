import { AccountsGetResponse } from 'plaid';
import { buildItem } from './build-item';
import { buildAccount } from './build-account';

export const buildAccountsBalanceGetResponse = (
  overrides: Partial<AccountsGetResponse> = {}
): AccountsGetResponse => {
  const item = buildItem();
  const account = buildAccount({ item_id: item.item_id });

  const accountsGetResponse: AccountsGetResponse = {
    accounts: [account],
    item: item,
    request_id: '',
    ...overrides
  };

  return accountsGetResponse;
};
