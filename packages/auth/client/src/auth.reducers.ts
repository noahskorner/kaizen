import {
  AuthAction,
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  REFRESH_TOKEN_FAILURE,
  REFRESH_TOKEN_SUCCESS
} from './auth.actions';
import { AuthStore } from './auth.store';

const initialState: AuthStore = {
  loading: true,
  id: null,
  email: null
};

export const authReducers = (
  state = initialState,
  action: AuthAction
): AuthStore => {
  switch (action.type) {
    case LOGIN:
      return {
        loading: true,
        id: null,
        email: null
      };
    case LOGIN_SUCCESS:
      return {
        loading: false,
        id: action.payload.id,
        email: action.payload.email
      };
    case LOGIN_FAILURE:
      return {
        loading: false,
        id: null,
        email: null
      };
    case REFRESH_TOKEN_SUCCESS:
      return {
        loading: false,
        id: action.payload.id,
        email: action.payload.email
      };
    case REFRESH_TOKEN_FAILURE:
      return {
        loading: false,
        id: null,
        email: null
      };
    case LOGOUT:
      return {
        loading: false,
        id: null,
        email: null
      };
    default:
      return state;
  }
};
