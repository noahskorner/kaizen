import { put, takeEvery } from 'redux-saga/effects';
import {
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_FAILURE,
  LOAD_CATEGORIES_SUCCESS
} from './category.actions';
import { CategoryClient } from './category.client';

export function* loadCategories() {
  yield takeEvery(LOAD_CATEGORIES, async function* loadCategories() {
    const response = await CategoryClient.find();
    if (response.type === 'FAILURE') {
      yield put({ type: LOAD_CATEGORIES_FAILURE, payload: response.errors });
    } else {
      yield put({ type: LOAD_CATEGORIES_SUCCESS, payload: response.data });
    }
  });
}
