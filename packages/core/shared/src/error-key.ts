export enum ErrorKey {
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  CREATE_USER_INVALID_EMAIL = 'CREATE_USER_INVALID_EMAIL',
  CREATE_USER_INVALID_PASSWORD = 'CREATE_USER_INVALID_PASSWORD',
  CREATE_USER_PASSWORD_TOO_SHORT = 'CREATE_USER_PASSWORD_TOO_SHORT',
  CREATE_USER_PASSWORD_NO_NUMBER = 'CREATE_USER_PASSWORD_NO_NUMBER',
  CREATE_USER_PASSWORD_NO_SYMBOL = 'CREATE_USER_PASSWORD_NO_SYMBOL',
  CREATE_USER_EMAIL_ALREADY_EXISTS = 'CREATE_USER_EMAIL_ALREADY_EXISTS',
  LOGIN_INCORECT_EMAIL_OR_PASSWORD = 'LOGIN_INCORECT_EMAIL_OR_PASSWORD',
  REFRESH_TOKEN_INVALID = 'REFRESH_TOKEN_INVALID',
  REFRESH_TOKEN_EXPIRED = 'REFRESH_TOKEN_EXPIRED',
  CREATE_LINK_TOKEN_USER_NOT_FOUND = 'CREATE_LINK_TOKEN_USER_NOT_FOUND',
  CREATE_ACCOUNT_INVALID_PLAID_PUBLIC_TOKEN = 'CREATE_ACCOUNT_INVALID_PLAID_PUBLIC_TOKEN',
  FIND_TRANSACTIONS_INVALID_PAGE = 'FIND_TRANSACTIONS_INVALID_PAGE',
  FIND_TRANSACTIONS_INVALID_PAGE_SIZE = 'FIND_TRANSACTIONS_INVALID_PAGE_SIZE',
  CREATE_VIRTUAL_ACCOUNT_INVALID_NAME = 'CREATE_VIRTUAL_ACCOUNT_INVALID_NAME',
  CREATE_VIRTUAL_ACCOUNT_INVALID_AMOUNT = 'CREATE_VIRTUAL_ACCOUNT_INVALID_AMOUNT',
  CREATE_VIRTUAL_ACCOUNT_INVALID_BALANCE = 'CREATE_VIRTUAL_ACCOUNT_INVALID_BALANCE',
  CREATE_VIRTUAL_ACCOUNT_INVALID_FREQUENCY = 'CREATE_VIRTUAL_ACCOUNT_INVALID_FREQUENCY',
  SYNC_TRANSACTIONS_INSTITUTION_NOT_FOUND = 'SYNC_TRANSACTIONS_INSTITUTION_NOT_FOUND',
  SYNC_ACCOUNTS_INSTITUTION_NOT_FOUND = 'SYNC_ACCOUNTS_INSTITUTION_NOT_FOUND'
}
