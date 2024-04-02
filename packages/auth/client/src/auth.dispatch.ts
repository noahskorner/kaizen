import { ThunkDispatch } from '@reduxjs/toolkit';
import { AuthState } from './auth.state';
import { AuthAction } from './auth.actions';

export type AuthDispatch = ThunkDispatch<AuthState, unknown, AuthAction>;
