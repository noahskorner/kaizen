import { Category } from '@kaizen/finance';
import { PersonalFinanceCategory as PlaidCategory } from 'plaid';

export const expectCategoryToBeExternal = (
  category: Category,
  external: PlaidCategory | null,
  externalIconUrl: string | null
) => {
  expect(category.id).toBeDefined();
  expect(category.originalCategory).toBe(external?.primary ?? null);
  expect(category.detailed).toBe(external?.detailed ?? null);
  expect(category.confidenceLevel).toBe(external?.confidence_level ?? null);
  expect(category.iconUrl).toBe(externalIconUrl);
};
