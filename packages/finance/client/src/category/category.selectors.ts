import { CategoryState } from './category.store';

export const selectCategories = (state: CategoryState) =>
  state.category.categories;
