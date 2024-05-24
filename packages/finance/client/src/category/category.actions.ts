import { ApiError } from '@kaizen/core';
import { Category } from '@kaizen/finance';

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
export interface LoadCategoriesAction {
  type: typeof LOAD_CATEGORIES;
}
export const loadCategoriesAction = (): LoadCategoriesAction => {
  return {
    type: LOAD_CATEGORIES
  };
};

export const LOAD_CATEGORIES_SUCCESS = 'LOAD_CATEGORIES_SUCCESS';
export interface LoadCategoriesSuccessAction {
  type: typeof LOAD_CATEGORIES_SUCCESS;
  payload: Category[];
}
export const loadCategoriesSuccessAction = (
  categories: Category[]
): LoadCategoriesSuccessAction => {
  return {
    type: LOAD_CATEGORIES_SUCCESS,
    payload: categories
  };
};

export const LOAD_CATEGORIES_FAILURE = 'LOAD_CATEGORIES_FAILURE';
export interface LoadCategoriesFailureAction {
  type: typeof LOAD_CATEGORIES_FAILURE;
  payload: ApiError[];
}
export const loadCategoriesFailureAction = (
  error: ApiError[]
): LoadCategoriesFailureAction => {
  return {
    type: LOAD_CATEGORIES_FAILURE,
    payload: error
  };
};

export const ADD_CATEGORY = 'ADD_CATEGORY';
export interface AddCategoryAction {
  type: typeof ADD_CATEGORY;
  payload: Category;
}
export const addCategoryAction = (category: Category): AddCategoryAction => {
  return {
    type: ADD_CATEGORY,
    payload: category
  };
};

export type CategoryAction =
  | LoadCategoriesAction
  | LoadCategoriesSuccessAction
  | LoadCategoriesFailureAction
  | AddCategoryAction;
