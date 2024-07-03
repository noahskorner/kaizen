import {
  SET_SCREEN_DIMENSIONS,
  SetScreenDimensionsAction,
  showSidebarAction
} from '@kaizen/core-client';
import { put, takeEvery } from 'redux-saga/effects';

export function* onDesktopShowSidebar() {
  yield takeEvery(
    SET_SCREEN_DIMENSIONS,
    function* (action: SetScreenDimensionsAction) {
      if (action.payload.width >= 768) {
        yield put(showSidebarAction());
      }
    }
  );
}
