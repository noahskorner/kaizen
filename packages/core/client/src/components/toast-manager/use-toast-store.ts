import { create } from 'zustand';
import { ToastProps } from './toast';
import { v4 as uuid } from 'uuid';
import { ApiError } from '@kaizen/core';

export interface ToastStore {
  toasts: ToastProps[];
  addToast: (toast: Omit<ToastProps, 'id'>) => void;
  addFailureToast: (errors: ApiError[]) => void;
  removeToast: (id: string) => void;
}

const initialState: Omit<
  ToastStore,
  'addToast' | 'removeToast' | 'addFailureToast'
> = {
  toasts: []
};

export const useToastStore = create<ToastStore>((set) => ({
  ...initialState,
  addToast: (toast) =>
    set((state) => ({ toasts: [...state.toasts, { ...toast, id: uuid() }] })),
  addFailureToast: (errors) => {
    return set((state) => {
      const failureToast: ToastProps = {
        id: uuid(),
        title: 'Uh oh!',
        message: errors.map((error) => error.message).join(' ')
      };

      return {
        toasts: [...state.toasts, failureToast]
      };
    });
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id)
    }))
}));
