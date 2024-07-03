import {
  SET_SCREEN_DIMENSIONS,
  SetScreenDimensionsAction,
  hideSidebarAction
} from '@kaizen/core-client';
import { put, takeEvery } from 'redux-saga/effects';

export function* onMobileHideSidebar() {
  yield takeEvery(
    SET_SCREEN_DIMENSIONS,
    function* (action: SetScreenDimensionsAction) {
      if (action.payload.width < 768) {
        yield put(hideSidebarAction());
      }
    }
  );
}
