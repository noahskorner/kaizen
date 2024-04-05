import { LOGIN_FAILURE, LoginFailureAction } from '@kaizen/auth-client';
import { CreateToastRequest, createToast } from '@kaizen/core-client';
import { put, takeEvery } from 'redux-saga/effects';

export function* onLoginFailureDisplayToast() {
  yield takeEvery(LOGIN_FAILURE, function* (action: LoginFailureAction) {
    const toast: CreateToastRequest = {
      title: 'Uh oh!',
      message: action.payload.map((error) => error.message).join(', ')
    };
    yield put(createToast(toast));
  });
}
