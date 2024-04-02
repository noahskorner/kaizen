import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
  refreshTokenAction,
  refreshTokenFailureAction,
  refreshTokenSuccessAction
} from './auth.actions';
import { AuthClient } from './auth.client';
import { AccessToken, LoginRequest } from '@kaizen/auth';
import { jwtDecode } from 'jwt-decode';
import { AuthDispatch } from './auth.dispatch';

export const login = (request: LoginRequest, onLoginSuccess: () => void) => {
  return async (dispatch: AuthDispatch) => {
    dispatch(loginAction());

    const response = await AuthClient.login(request);
    if (response.type === 'FAILURE')
      return dispatch(loginFailureAction(response.errors));

    const accessToken = jwtDecode<AccessToken>(response.data.accessToken);
    onLoginSuccess();
    dispatch(loginSuccessAction(accessToken));
  };
};

export const refreshToken = () => {
  return async (dispatch: AuthDispatch) => {
    dispatch(refreshTokenAction());

    const response = await AuthClient.refreshToken();
    if (response.type === 'FAILURE')
      return dispatch(refreshTokenFailureAction(response.errors));

    const accessToken = jwtDecode<AccessToken & { exp: number }>(
      response.data.accessToken
    );
    dispatch(refreshTokenSuccessAction(accessToken));

    setTimeout(() => {
      dispatch(refreshToken());
    }, accessToken.exp * 1000);
  };
};
