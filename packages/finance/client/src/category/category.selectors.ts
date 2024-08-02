import { createSelector } from 'reselect';
import { CategoryState } from './category.store';

export const selectCategories = (state: CategoryState) =>
  state.category.categories;

export const selectCategoriesByParentId = (parentId: string | null) =>
  createSelector(selectCategories, (categories) => {
    return categories.filter((category) => category.parentId === parentId);
  });
