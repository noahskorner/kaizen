import { ToastProps } from './toast/toast';

export const CREATE_TOAST = 'CREATE_TOAST';
export interface CreateToastAction {
  type: typeof CREATE_TOAST;
  payload: ToastProps;
}
export const createToastAction = (toast: ToastProps): CreateToastAction => {
  return {
    type: CREATE_TOAST,
    payload: toast
  };
};

export const DELETE_TOAST = 'DELETE_TOAST';
export interface DeleteToastAction {
  type: typeof DELETE_TOAST;
  payload: string;
}
export const deleteToastAction = (toastId: string): DeleteToastAction => {
  return {
    type: DELETE_TOAST,
    payload: toastId
  };
};

export type ToastAction = CreateToastAction | DeleteToastAction;
