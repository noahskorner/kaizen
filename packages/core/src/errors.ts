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
  },
  [ErrorKey.CREATE_USER_INVALID_PASSWORD]: {
    key: ErrorKey.CREATE_USER_INVALID_PASSWORD,
    message: 'Must provide a password.'
  },
  [ErrorKey.CREATE_USER_PASSWORD_TOO_SHORT]: {
    key: ErrorKey.CREATE_USER_PASSWORD_TOO_SHORT,
    message: 'Password must be at least 8 characters.'
  },
  [ErrorKey.CREATE_USER_PASSWORD_NO_NUMBER]: {
    key: ErrorKey.CREATE_USER_PASSWORD_NO_NUMBER,
    message: 'Password must contain a number.'
  },
  [ErrorKey.CREATE_USER_PASSWORD_NO_SYMBOL]: {
    key: ErrorKey.CREATE_USER_PASSWORD_NO_SYMBOL,
    message: 'Password must contain a symbol.'
  },
  [ErrorKey.CREATE_USER_EMAIL_ALREADY_EXISTS]: {
    key: ErrorKey.CREATE_USER_EMAIL_ALREADY_EXISTS,
    message: 'A user with this email already exists.'
  },
  [ErrorKey.LOGIN_INCORECT_EMAIL_OR_PASSWORD]: {
    key: ErrorKey.LOGIN_INCORECT_EMAIL_OR_PASSWORD,
    message: 'Incorrect email or password.'
  },
  [ErrorKey.REFRESH_TOKEN_INVALID]: {
    key: ErrorKey.REFRESH_TOKEN_INVALID,
    message: 'Must provide a valid refreshToken.'
  },
  [ErrorKey.REFRESH_TOKEN_EXPIRED]: {
    key: ErrorKey.REFRESH_TOKEN_EXPIRED,
    message: 'Your token has expired.'
  },
  [ErrorKey.CREATE_LINK_TOKEN_USER_NOT_FOUND]: {
    key: ErrorKey.CREATE_LINK_TOKEN_USER_NOT_FOUND,
    message: 'User not found.'
  },
  [ErrorKey.CREATE_ACCOUNT_INVALID_PLAID_PUBLIC_TOKEN]: {
    key: ErrorKey.CREATE_ACCOUNT_INVALID_PLAID_PUBLIC_TOKEN,
    message: 'Must provide a valid plaidPublicToken.'
  },
  [ErrorKey.FIND_TRANSACTIONS_INVALID_PAGE]: {
    key: ErrorKey.FIND_TRANSACTIONS_INVALID_PAGE,
    message: 'Must provide a valid page number.'
  },
  [ErrorKey.FIND_TRANSACTIONS_INVALID_PAGE_SIZE]: {
    key: ErrorKey.FIND_TRANSACTIONS_INVALID_PAGE_SIZE,
    message: 'The page size you provided is invalid.'
  }
};
