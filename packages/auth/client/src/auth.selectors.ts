import { AuthState } from './auth.store';

export const selectLoading = (store: AuthState): boolean => {
  return store.auth.loading;
};

export const selectAuthenticated = (store: AuthState): boolean => {
  return store.auth.id !== null;
};

export const selectEmail = (store: AuthState): string | null => {
  return store.auth.email;
};

export const selectUserId = (store: AuthState): string | null => {
  return store.auth.id;
};
