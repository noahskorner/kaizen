// import { ApiError } from './api-error';
// import { ErrorCode } from './error-code';

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// const Errors: Record<Partial<ErrorCode>, ApiError> = {
//   [ErrorCode.INTERNAL_SERVER_ERROR]: {
//     key: ErrorCode.INTERNAL_SERVER_ERROR,
//     message: 'An unexpected error occurred.'
//   },
//   [ErrorCode.CREATE_USER_INVALID_EMAIL]: {
//     key: ErrorCode.CREATE_USER_INVALID_EMAIL,
//     message: 'Must provide a valid email address.'
//   },
//   [ErrorCode.CREATE_USER_INVALID_PASSWORD]: {
//     key: ErrorCode.CREATE_USER_INVALID_PASSWORD,
//     message: 'Must provide a password.'
//   },
//   [ErrorCode.CREATE_USER_PASSWORD_TOO_SHORT]: {
//     key: ErrorCode.CREATE_USER_PASSWORD_TOO_SHORT,
//     message: 'Password must be at least 8 characters.'
//   },
//   [ErrorCode.CREATE_USER_PASSWORD_NO_NUMBER]: {
//     key: ErrorCode.CREATE_USER_PASSWORD_NO_NUMBER,
//     message: 'Password must contain a number.'
//   },
//   [ErrorCode.CREATE_USER_PASSWORD_NO_SYMBOL]: {
//     key: ErrorCode.CREATE_USER_PASSWORD_NO_SYMBOL,
//     message: 'Password must contain a symbol.'
//   },
//   [ErrorCode.CREATE_USER_EMAIL_ALREADY_EXISTS]: {
//     key: ErrorCode.CREATE_USER_EMAIL_ALREADY_EXISTS,
//     message: 'A user with this email already exists.'
//   },
//   [ErrorCode.LOGIN_INCORECT_EMAIL_OR_PASSWORD]: {
//     key: ErrorCode.LOGIN_INCORECT_EMAIL_OR_PASSWORD,
//     message: 'Incorrect email or password.'
//   },
//   [ErrorCode.REFRESH_TOKEN_INVALID]: {
//     key: ErrorCode.REFRESH_TOKEN_INVALID,
//     message: 'Must provide a valid refreshToken.'
//   },
//   [ErrorCode.REFRESH_TOKEN_EXPIRED]: {
//     key: ErrorCode.REFRESH_TOKEN_EXPIRED,
//     message: 'Your token has expired.'
//   },
//   [ErrorCode.CREATE_LINK_TOKEN_USER_NOT_FOUND]: {
//     key: ErrorCode.CREATE_LINK_TOKEN_USER_NOT_FOUND,
//     message: 'User not found.'
//   },
//   [ErrorCode.CREATE_INSTITUTION_FAILED_TO_SYNC_ACCOUNTS]: {
//     key: ErrorCode.CREATE_INSTITUTION_FAILED_TO_SYNC_ACCOUNTS,
//     message: 'Failed to created accounts for this institution.'
//   },
//   [ErrorCode.CREATE_ACCOUNT_INVALID_PLAID_PUBLIC_TOKEN]: {
//     key: ErrorCode.CREATE_ACCOUNT_INVALID_PLAID_PUBLIC_TOKEN,
//     message: 'Must provide a valid plaidPublicToken.'
//   },
//   [ErrorCode.FIND_TRANSACTIONS_INVALID_PAGE]: {
//     key: ErrorCode.FIND_TRANSACTIONS_INVALID_PAGE,
//     message: 'Must provide a valid page number.'
//   },
//   [ErrorCode.FIND_TRANSACTIONS_INVALID_PAGE_SIZE]: {
//     key: ErrorCode.FIND_TRANSACTIONS_INVALID_PAGE_SIZE,
//     message: 'The page size you provided is invalid.'
//   },
//   [ErrorCode.FIND_TRANSACTIONS_INVALID_START_DATE]: {
//     key: ErrorCode.FIND_TRANSACTIONS_INVALID_START_DATE,
//     message:
//       'The start date you provided is invalid. It must be in ISO 8601 format.'
//   },
//   [ErrorCode.FIND_TRANSACTIONS_INVALID_END_DATE]: {
//     key: ErrorCode.FIND_TRANSACTIONS_INVALID_END_DATE,
//     message:
//       'The end date you provided is invalid. It must be in ISO 8601 format.'
//   },
//   [ErrorCode.FIND_TRANSACTIONS_INVALID_TIMEFRAME]: {
//     key: ErrorCode.FIND_TRANSACTIONS_INVALID_TIMEFRAME,
//     message: 'The end date you provided is before the start date.'
//   },
//   [ErrorCode.CREATE_VIRTUAL_ACCOUNT_INVALID_AMOUNT]: {
//     key: ErrorCode.CREATE_VIRTUAL_ACCOUNT_INVALID_AMOUNT,
//     message: 'Must provide a valid amount.'
//   },
//   [ErrorCode.CREATE_VIRTUAL_ACCOUNT_INVALID_BALANCE]: {
//     key: ErrorCode.CREATE_VIRTUAL_ACCOUNT_INVALID_BALANCE,
//     message: 'Must provide a valid balance.'
//   },
//   [ErrorCode.CREATE_VIRTUAL_ACCOUNT_INVALID_FREQUENCY]: {
//     key: ErrorCode.CREATE_VIRTUAL_ACCOUNT_INVALID_FREQUENCY,
//     message: 'Must provide a valid frequency.'
//   },
//   [ErrorCode.CREATE_VIRTUAL_ACCOUNT_INVALID_NAME]: {
//     key: ErrorCode.CREATE_VIRTUAL_ACCOUNT_INVALID_NAME,
//     message: 'Must provide a valid virtual account name.'
//   },
//   [ErrorCode.SYNC_ACCOUNTS_INSTITUTION_NOT_FOUND]: {
//     key: ErrorCode.SYNC_ACCOUNTS_INSTITUTION_NOT_FOUND,
//     message: 'Institution not found.'
//   },
//   [ErrorCode.SYNC_TRANSACTIONS_INSTITUTION_NOT_FOUND]: {
//     key: ErrorCode.SYNC_TRANSACTIONS_INSTITUTION_NOT_FOUND,
//     message: 'Institution not found.'
//   },
//   [ErrorCode.SYNC_TRANSACTIONS_INSTITUTION_NOT_UPDATED]: {
//     key: ErrorCode.SYNC_TRANSACTIONS_INSTITUTION_NOT_UPDATED,
//     message: 'Institution not updated.'
//   },
//   [ErrorCode.SYNC_TRANSACTIONS_ACCOUNT_NOT_FOUND]: {
//     key: ErrorCode.SYNC_TRANSACTIONS_ACCOUNT_NOT_FOUND,
//     message: 'Account not found.'
//   }
// };
