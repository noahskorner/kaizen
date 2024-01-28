import { Item, ItemUpdateTypeEnum } from 'plaid';
import { v4 as uuid } from 'uuid';

export const buildItem = (overrides: Partial<Item> = {}): Item => {
  return {
    item_id: uuid(),
    webhook: null,
    error: null,
    available_products: [],
    billed_products: [],
    consent_expiration_time: null,
    update_type: ItemUpdateTypeEnum.Background,
    ...overrides
  };
};
