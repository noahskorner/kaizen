import {
  ADD_CATEGORY,
  CategoryAction,
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_FAILURE,
  LOAD_CATEGORIES_SUCCESS
} from './category.actions';
import { CategoryStore } from './category.store';

const initialState: CategoryStore = {
  loading: false,
  categories: []
};

export const categoryReducers = (
  state = initialState,
  action: CategoryAction
): CategoryStore => {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return {
        loading: true,
        categories: []
      };
    case LOAD_CATEGORIES_SUCCESS:
      return {
        loading: false,
        categories: action.payload
      };
    case LOAD_CATEGORIES_FAILURE:
      return {
        loading: false,
        categories: []
      };
    case ADD_CATEGORY:
      return {
        loading: false,
        categories: [action.payload, ...state.categories]
      };
    default:
      return state;
  }
};
