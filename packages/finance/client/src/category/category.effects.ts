import {
  loadCategoriesAction,
  loadCategoriesFailureAction,
  loadCategoriesSuccessAction
} from './category.actions';
import { CategoryClient } from './category.client';
import { CategoryDispatch } from './category.store';

export const loadCategories = () => {
  return async (dispatch: CategoryDispatch) => {
    dispatch(loadCategoriesAction());

    const response = await CategoryClient.find();
    if (response.type === 'FAILURE')
      return dispatch(loadCategoriesFailureAction(response.errors));

    return dispatch(loadCategoriesSuccessAction(response.data));
  };
};
