import { ThunkDispatch } from '@reduxjs/toolkit';
import { ToastProps } from './toast/toast';
import { ToastAction } from './toast.actions';

export interface ToastStore {
  toasts: ToastProps[];
}

export type ToastState = {
  toast: ToastStore;
};

export type ToastDispatch = ThunkDispatch<ToastState, unknown, ToastAction>;
