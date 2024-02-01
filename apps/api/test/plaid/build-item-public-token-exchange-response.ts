import { ItemPublicTokenExchangeResponse } from 'plaid';
import { v4 as uuid } from 'uuid';

export const buildItemPublicTokenExchangeResponse = (
  overrides?: Partial<ItemPublicTokenExchangeResponse>
): ItemPublicTokenExchangeResponse => {
  return {
    access_token: 'MOCK_EXTERNAL_ACCESS_TOKEN',
    item_id: uuid(),
    request_id: '',
    ...overrides
  };
};
