import { Category } from '@kaizen/finance';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { CategoryAction } from './category.actions';

export interface CategoryStore {
  loading: boolean;
  categories: Category[];
}

export type CategoryState = {
  category: CategoryStore;
};

export type CategoryDispatch = ThunkDispatch<
  CategoryState,
  unknown,
  CategoryAction
>;
