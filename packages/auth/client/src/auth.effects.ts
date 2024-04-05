import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
  logoutAction,
  refreshTokenAction,
  refreshTokenFailureAction,
  refreshTokenSuccessAction
} from './auth.actions';
import { AuthClient } from './auth.client';
import { AccessToken, LoginRequest } from '@kaizen/auth';
import { jwtDecode } from 'jwt-decode';
import { AuthDispatch } from './auth.store';

export const login = (request: LoginRequest, onLoginSuccess: () => void) => {
  return async (dispatch: AuthDispatch) => {
    dispatch(loginAction());

    const response = await AuthClient.login(request);
    if (response.type === 'FAILURE')
      return dispatch(loginFailureAction(response.errors));

    const accessToken = jwtDecode<AccessToken & { exp: number }>(
      response.data.accessToken
    );
    onLoginSuccess();
    dispatch(loginSuccessAction(accessToken));

    silentRefresh(accessToken.exp, dispatch);
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

    silentRefresh(accessToken.exp, dispatch);
  };
};

export const logout = () => {
  return (dispatch: AuthDispatch) => {
    AuthClient.logout();
    dispatch(logoutAction());
  };
};

const silentRefresh = (exp: number, dispatch: AuthDispatch) => {
  const currentTime = Math.floor(Date.now() / 1000); // get current time in seconds
  const ms = (exp - currentTime) * 1000; // remaining time in milliseconds
  setTimeout(() => {
    dispatch(refreshToken());
  }, ms);
};
