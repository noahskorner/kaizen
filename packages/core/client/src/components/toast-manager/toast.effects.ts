import { createToastAction, deleteToastAction } from './toast.actions';
import { ToastDispatch } from './toast.store';
import { ToastProps } from './toast/toast';
import { v4 as uuid } from 'uuid';

export const DEFAULT_TOAST_DURATION = 5000;

export type CreateToastRequest = Omit<ToastProps, 'id'>;

export const createToast = (request: CreateToastRequest) => {
  return async (dispatch: ToastDispatch) => {
    const toast: ToastProps = {
      id: uuid(),
      ...request
    };
    dispatch(createToastAction(toast));

    setTimeout(() => {
      dispatch(deleteToastAction(toast.id));
    }, toast.duration ?? DEFAULT_TOAST_DURATION);
  };
};
