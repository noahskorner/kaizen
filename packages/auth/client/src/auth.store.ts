import { ThunkDispatch } from '@reduxjs/toolkit';
import { AuthAction } from './auth.actions';
export interface AuthStore {
  loading: boolean;
  id: string | null;
  email: string | null;
}

export type AuthState = {
  auth: AuthStore;
};

export type AuthDispatch = ThunkDispatch<AuthState, unknown, AuthAction>;
