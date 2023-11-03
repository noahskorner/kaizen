import { ApiError } from './api-error';
import { ErrorKey } from './error-key';

export const Errors: Record<Partial<ErrorKey>, ApiError> = {
  [ErrorKey.INTERNAL_SERVER_ERROR]: {
    key: ErrorKey.INTERNAL_SERVER_ERROR,
    message: 'An unexpected error occurred.'
  },
  [ErrorKey.CREATE_USER_INVALID_EMAIL]: {
    key: ErrorKey.CREATE_USER_INVALID_EMAIL,
    message: 'Must provide a valid email address.'
  }
};
