import { ErrorKey } from './error-key';

export const Errors: Record<ErrorKey, string> = {
  [ErrorKey.CREATE_USER_INVALID_EMAIL]: 'Must provide a valid email address.'
};
