export enum ErrorCode {
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  GET_USER_NOT_FOUND = 'GET_USER_NOT_FOUND',
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
  CREATE_INSTITUTION_FAILED_TO_SYNC_ACCOUNTS = 'CREATE_INSTITUTION_FAILED_TO_SYNC_ACCOUNTS',
  CREATE_ACCOUNT_INVALID_PLAID_PUBLIC_TOKEN = 'CREATE_ACCOUNT_INVALID_PLAID_PUBLIC_TOKEN',
  FIND_TRANSACTIONS_INVALID_PAGE = 'FIND_TRANSACTIONS_INVALID_PAGE',
  FIND_TRANSACTIONS_INVALID_PAGE_SIZE = 'FIND_TRANSACTIONS_INVALID_PAGE_SIZE',
  FIND_TRANSACTIONS_INVALID_START_DATE = 'FIND_TRANSACTIONS_INVALID_START_DATE',
  FIND_TRANSACTIONS_INVALID_END_DATE = 'FIND_TRANSACTIONS_INVALID_END_DATE',
  FIND_TRANSACTIONS_INVALID_TIMEFRAME = 'FIND_TRANSACTIONS_INVALID_TIMEFRAME',
  SYNC_INSTITUTIONS_ACCOUNT_SYNC_FAILURE = 'SYNC_INSTITUTIONS_ACCOUNT_SYNC_FAILURE',
  SYNC_ACCOUNTS_INSTITUTION_NOT_FOUND = 'SYNC_ACCOUNTS_INSTITUTION_NOT_FOUND',
  SYNC_TRANSACTIONS_INSTITUTIONS_NOT_FOUND = 'SYNC_TRANSACTIONS_INSTITUTIONS_NOT_FOUND',
  SYNC_TRANSACTIONS_INSTITUTION_NOT_FOUND = 'SYNC_TRANSACTIONS_INSTITUTION_NOT_FOUND',
  SYNC_TRANSACTIONS_INSTITUTION_NOT_UPDATED = 'SYNC_TRANSACTIONS_INSTITUTION_NOT_UPDATED',
  SYNC_TRANSACTIONS_ACCOUNTS_NOT_FOUND = 'SYNC_TRANSACTIONS_ACCOUNTS_NOT_FOUND',
  SYNC_TRANSACTIONS_ACCOUNT_NOT_FOUND = 'SYNC_TRANSACTIONS_ACCOUNT_NOT_FOUND',
  SYNC_TRANSACTIONS_TRANSACTIONS_NOT_FOUND = 'SYNC_TRANSACTIONS_TRANSACTIONS_NOT_FOUND',
  FINANCIAL_PROVIDER_LINK_TOKEN_CREATE = 'FINANCIAL_PROVIDER_LINK_TOKEN_CREATE',
  FINANCIAL_PROVIDER_EXCHANGE_PUBLIC_TOKEN = 'FINANCIAL_PROVIDER_EXCHANGE_PUBLIC_TOKEN',
  FINANCIAL_PROVIDER_GET_EXTERNAL_ACCOUNTS = 'FINANCIAL_PROVIDER_GET_EXTERNAL_ACCOUNTS',
  FINANCIAL_PROVIDER_SYNC_EXTERNAL_TRANSACTIONS = 'FINANCIAL_PROVIDER_SYNC_EXTERNAL_TRANSACTIONS',
  CREATE_WALLET_MUST_PROVIDE_USER_ID = 'CREATE_WALLET_MUST_PROVIDE_USER_ID',
  CREATE_WALLET_ALREADY_EXISTS_FOR_USER = 'CREATE_WALLET_WALLET_ALREADY_EXISTS_FOR_USER',
  UPDATE_WALLET_NOT_FOUND = 'UPDATE_WALLET_NOT_FOUND',
  UPDATE_WALLET_MUST_PROVIDE_UNIQUE_TRANSACTION_ID = 'UPDATE_WALLET_MUST_PROVIDE_UNIQUE_TRANSACTION_ID',
  UPDATE_WALLET_MUST_PROVIDE_AMOUNT = 'UPDATE_WALLET_MUST_PROVIDE_AMOUNT',
  UPDATE_WALLET_TRANSACTION_ALREADY_EXISTS = 'UPDATE_WALLET_TRANSACTION_ALREADY_EXISTS',
  UPDATE_WALLET_NOT_ENOUGH_FUNDS = 'UPDATE_WALLET_NOT_ENOUGH_FUNDS',
  GET_WALLET_NOT_YOUR_WALLET = 'GET_WALLET_NOT_YOUR_WALLET',
  GET_WALLET_NOT_FOUND = 'GET_WALLET_NOT_FOUND',
  FIND_EXPENSES_INVALID_START_DATE = 'FIND_EXPENSES_INVALID_START_DATE',
  FIND_EXPENSES_INVALID_END_DATE = 'FIND_EXPENSES_INVALID_END_DATE',
  FIND_EXPENSES_INVALID_TIMEFRAME = 'FIND_EXPENSES_INVALID_TIMEFRAME',
  UPDATE_TRANSACTION_CATEGORY_TRANSACTION_NOT_FOUND = 'UPDATE_TRANSACTION_CATEGORY_TRANSACTION_NOT_FOUND',
  UPDATE_TRANSACTION_CATEGORY_NOT_FOUND = 'UPDATE_TRANSACTION_CATEGORY_NOT_FOUND',
  CREATE_CATEGORY_MUST_PROVIDE_NAME = 'CREATE_CATEGORY_MUST_PROVIDE_NAME',
  CREATE_CATEGORY_ALREADY_EXISTS = 'CREATE_CATEGORY_ALREADY_EXISTS',
  TRANSCRIPTION_PROVIDER_TRANSCRIPTION_FAILED = 'TRANSCRIPTION_PROVIDER_TRANSCRIPTION_FAILED'
}
