import { AuthState } from './auth.state';

export const selectLoading = (store: AuthState): boolean => {
  return store.auth.loading;
};

export const selectAuthenticated = (store: AuthState): boolean => {
  return store.auth.id !== null;
};
