import { AccessToken } from '@kaizen/auth';
import { ApiError } from '@kaizen/core';

export const LOGIN = 'LOGIN';
export interface LoginAction {
  type: typeof LOGIN;
}
export const loginAction = (): LoginAction => {
  return {
    type: LOGIN
  };
};

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: AccessToken;
}
export const loginSuccessAction = (
  accessToken: AccessToken
): LoginSuccessAction => {
  return {
    type: LOGIN_SUCCESS,
    payload: accessToken
  };
};

export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: Array<ApiError>;
}
export const loginFailureAction = (
  errors: Array<ApiError>
): LoginFailureAction => {
  return {
    type: LOGIN_FAILURE,
    payload: errors
  };
};

export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export interface RefreshTokenAction {
  type: typeof REFRESH_TOKEN;
}
export const refreshTokenAction = (): RefreshTokenAction => {
  return {
    type: REFRESH_TOKEN
  };
};

export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export interface RefreshTokenSuccessAction {
  type: typeof REFRESH_TOKEN_SUCCESS;
  payload: AccessToken;
}
export const refreshTokenSuccessAction = (
  accessToken: AccessToken
): RefreshTokenSuccessAction => {
  return {
    type: REFRESH_TOKEN_SUCCESS,
    payload: accessToken
  };
};

export const REFRESH_TOKEN_FAILURE = 'REFRESH_TOKEN_FAILURE';
export interface RefreshTokenFailureAction {
  type: typeof REFRESH_TOKEN_FAILURE;
  payload: Array<ApiError>;
}
export const refreshTokenFailureAction = (
  errors: Array<ApiError>
): RefreshTokenFailureAction => {
  return {
    type: REFRESH_TOKEN_FAILURE,
    payload: errors
  };
};

export const LOGOUT = 'LOGOUT';
export interface LogoutAction {
  type: typeof LOGOUT;
}
export const logoutAction = (): LogoutAction => {
  return {
    type: LOGOUT
  };
};

export type AuthAction =
  | LoginAction
  | LoginSuccessAction
  | LoginFailureAction
  | RefreshTokenAction
  | RefreshTokenSuccessAction
  | RefreshTokenFailureAction
  | LogoutAction;
