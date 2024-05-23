import { Category } from '@kaizen/finance';

export interface CategoryStore {
  loading: boolean;
  categories: Category[];
}

export type CategoryState = {
  category: CategoryStore;
};
