import { ToastState } from './toast.store';
import { ToastProps } from './toast/toast';

export const selectToasts = (store: ToastState): ToastProps[] => {
  return store.toast.toasts;
};
