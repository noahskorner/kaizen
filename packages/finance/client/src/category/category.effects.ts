import { put, takeEvery } from 'redux-saga/effects';
import {
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_FAILURE,
  LOAD_CATEGORIES_SUCCESS
} from './category.actions';
import { CategoryClient } from './category.client';

export function* loadCategories() {
  yield takeEvery(LOAD_CATEGORIES, function* loadCategories() {
    yield CategoryClient.find().then((response) => {
      if (response.type === 'FAILURE') {
        put({ type: LOAD_CATEGORIES_FAILURE, payload: response.errors });
      } else {
        put({ type: LOAD_CATEGORIES_SUCCESS, payload: response.data });
      }
    });
  });
}
