import { ToastAction, CREATE_TOAST, DELETE_TOAST } from './toast.actions';
import { ToastStore } from './toast.store';

const initialState: ToastStore = {
  toasts: []
};

export const toastReducers = (
  state = initialState,
  action: ToastAction
): ToastStore => {
  switch (action.type) {
    case CREATE_TOAST:
      return {
        toasts: [action.payload, ...state.toasts]
      };
    case DELETE_TOAST:
      return {
        toasts: state.toasts.filter((toast) => toast.id !== action.payload)
      };
    default:
      return state;
  }
};
