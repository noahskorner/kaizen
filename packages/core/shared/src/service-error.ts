import { ErrorCode } from './error-code';

interface RefreshTokenExpiredError {
  code: ErrorCode.REFRESH_TOKEN_EXPIRED;
  params: {
    expiredAt: string;
  };
}

interface CreateAccountInvalidPlaidPublicTokenError {
  code: ErrorCode.CREATE_ACCOUNT_INVALID_PLAID_PUBLIC_TOKEN;
  params: {
    plaidPublicToken: string;
  };
}

interface CreateVirtualAccountInvalidNameError {
  code: ErrorCode.CREATE_VIRTUAL_ACCOUNT_INVALID_NAME;
  params: {
    name: string;
  };
}

interface CreateVirtualAccountInvalidBalanceError {
  code: ErrorCode.CREATE_VIRTUAL_ACCOUNT_INVALID_BALANCE;
  params: {
    balance: number;
  };
}

interface CreateVirtualAccountInvalidAmountError {
  code: ErrorCode.CREATE_VIRTUAL_ACCOUNT_INVALID_AMOUNT;
  params: {
    amount: number;
  };
}

interface CreateVirtualAccountInvalidFrequencyError {
  code: ErrorCode.CREATE_VIRTUAL_ACCOUNT_INVALID_FREQUENCY;
  params: {
    frequency: number;
  };
}

interface FindTransactionsInvalidPageError {
  code: ErrorCode.FIND_TRANSACTIONS_INVALID_PAGE;
  params: {
    page: number;
  };
}

interface FindTransactionsInvalidPageSizeError {
  code: ErrorCode.FIND_TRANSACTIONS_INVALID_PAGE_SIZE;
  params: {
    pageSize: number;
  };
}

interface FindTransactionsInvalidStartDateSizeError {
  code: ErrorCode.FIND_TRANSACTIONS_INVALID_START_DATE;
  params: {
    startDate?: string;
  };
}

interface FindTransactionsInvalidEndDateSizeError {
  code: ErrorCode.FIND_TRANSACTIONS_INVALID_END_DATE;
  params: {
    endDate?: string;
  };
}

interface FindTransactionsInvalidInvalidTimeframeSizeError {
  code: ErrorCode.FIND_TRANSACTIONS_INVALID_TIMEFRAME;
  params: {
    startDate?: string;
    endDate?: string;
  };
}

interface SyncAccountsIntitutionNotFoundError {
  code: ErrorCode.SYNC_ACCOUNTS_INSTITUTION_NOT_FOUND;
  params: {
    instiutionIds: string[];
  };
}

interface SyncTransactionsInstitutionsNotFound {
  code: ErrorCode.SYNC_TRANSACTIONS_INSTITUTIONS_NOT_FOUND;
  params: {
    institutionIds: string[];
  };
}

interface SyncTransactionsInstitutionNotFound {
  code: ErrorCode.SYNC_TRANSACTIONS_INSTITUTION_NOT_FOUND;
  params: {
    institutionId: string;
  };
}

interface SyncTransactionsAccountsNotFound {
  code: ErrorCode.SYNC_TRANSACTIONS_ACCOUNTS_NOT_FOUND;
  params: {
    externalAccountIds: string[];
  };
}

interface SyncTransactionsAccountNotFound {
  code: ErrorCode.SYNC_TRANSACTIONS_ACCOUNT_NOT_FOUND;
  params: {
    accountId: string;
  };
}

interface FinancialProviderLinkTokenCreateError {
  code: ErrorCode.FINANCIAL_PROVIDER_LINK_TOKEN_CREATE;
  params: {
    userId: string;
    response?: unknown;
    error?: unknown;
  };
}

interface FinancialProviderExchangePublicTokenError {
  code: ErrorCode.FINANCIAL_PROVIDER_EXCHANGE_PUBLIC_TOKEN;
  params: {
    publicToken: string;
    response?: unknown;
    error?: unknown;
  };
}

interface FinancialProviderGetExternalAccountsError {
  code: ErrorCode.FINANCIAL_PROVIDER_GET_EXTERNAL_ACCOUNTS;
  params: {
    accessToken: string;
    response?: unknown;
    error?: unknown;
  };
}

interface FinancialProviderSyncExternalTransactionsError {
  code: ErrorCode.FINANCIAL_PROVIDER_SYNC_EXTERNAL_TRANSACTIONS;
  params: {
    accessToken: string;
    cursor: string | null;
    response?: unknown;
    error?: unknown;
  };
}

interface CreateLinkTokenUserNotFoundError {
  code: ErrorCode.CREATE_LINK_TOKEN_USER_NOT_FOUND;
  params: {
    userId: string;
  };
}

interface CreateUserInvalidEmailError {
  code: ErrorCode.CREATE_USER_INVALID_EMAIL;
  params: {
    email: string;
  };
}

interface CreateUserInvalidPasswordError {
  code: ErrorCode.CREATE_USER_INVALID_PASSWORD;
  params: {
    password: string;
  };
}

interface CreateUserPasswordTooShortError {
  code: ErrorCode.CREATE_USER_PASSWORD_TOO_SHORT;
  params: {
    password: string;
  };
}

interface CreateUserPasswordNoNumberError {
  code: ErrorCode.CREATE_USER_PASSWORD_NO_NUMBER;
  params: {
    password: string;
  };
}

interface CreateUserPasswordNoSymbolError {
  code: ErrorCode.CREATE_USER_PASSWORD_NO_SYMBOL;
  params: {
    password: string;
  };
}

interface CreateUserEmailAlreadyExistsError {
  code: ErrorCode.CREATE_USER_EMAIL_ALREADY_EXISTS;
  params: {
    email: string;
  };
}

interface GetUserNotFoundError {
  code: ErrorCode.GET_USER_NOT_FOUND;
  params: {
    userId: string;
  };
}

interface SyncTransactionsTransactionsNotFoundError {
  code: ErrorCode.SYNC_TRANSACTIONS_TRANSACTIONS_NOT_FOUND;
  params: {
    externalTransactionIds: string[];
  };
}

interface BaseError {
  code: Exclude<
    ErrorCode,
    | ErrorCode.REFRESH_TOKEN_EXPIRED
    | ErrorCode.CREATE_ACCOUNT_INVALID_PLAID_PUBLIC_TOKEN
    | ErrorCode.CREATE_VIRTUAL_ACCOUNT_INVALID_NAME
    | ErrorCode.CREATE_VIRTUAL_ACCOUNT_INVALID_BALANCE
    | ErrorCode.CREATE_VIRTUAL_ACCOUNT_INVALID_AMOUNT
    | ErrorCode.CREATE_VIRTUAL_ACCOUNT_INVALID_FREQUENCY
    | ErrorCode.FIND_TRANSACTIONS_INVALID_PAGE
    | ErrorCode.FIND_TRANSACTIONS_INVALID_PAGE_SIZE
    | ErrorCode.FIND_TRANSACTIONS_INVALID_START_DATE
    | ErrorCode.FIND_TRANSACTIONS_INVALID_END_DATE
    | ErrorCode.FIND_TRANSACTIONS_INVALID_TIMEFRAME
    | ErrorCode.SYNC_ACCOUNTS_INSTITUTION_NOT_FOUND
    | ErrorCode.SYNC_TRANSACTIONS_INSTITUTIONS_NOT_FOUND
    | ErrorCode.SYNC_TRANSACTIONS_INSTITUTION_NOT_FOUND
    | ErrorCode.SYNC_TRANSACTIONS_ACCOUNT_NOT_FOUND
    | ErrorCode.FINANCIAL_PROVIDER_LINK_TOKEN_CREATE
    | ErrorCode.FINANCIAL_PROVIDER_EXCHANGE_PUBLIC_TOKEN
    | ErrorCode.FINANCIAL_PROVIDER_GET_EXTERNAL_ACCOUNTS
    | ErrorCode.FINANCIAL_PROVIDER_SYNC_EXTERNAL_TRANSACTIONS
    | ErrorCode.CREATE_LINK_TOKEN_USER_NOT_FOUND
    | ErrorCode.CREATE_USER_INVALID_EMAIL
    | ErrorCode.CREATE_USER_INVALID_PASSWORD
    | ErrorCode.CREATE_USER_PASSWORD_TOO_SHORT
    | ErrorCode.CREATE_USER_PASSWORD_NO_NUMBER
    | ErrorCode.CREATE_USER_PASSWORD_NO_SYMBOL
    | ErrorCode.CREATE_USER_EMAIL_ALREADY_EXISTS
    | ErrorCode.GET_USER_NOT_FOUND
    | ErrorCode.SYNC_TRANSACTIONS_ACCOUNTS_NOT_FOUND
    | ErrorCode.SYNC_TRANSACTIONS_TRANSACTIONS_NOT_FOUND
  >;
  params?: never;
}

export type ServiceError =
  | BaseError
  | RefreshTokenExpiredError
  | CreateAccountInvalidPlaidPublicTokenError
  | CreateVirtualAccountInvalidNameError
  | CreateVirtualAccountInvalidBalanceError
  | CreateVirtualAccountInvalidAmountError
  | CreateVirtualAccountInvalidFrequencyError
  | FindTransactionsInvalidPageError
  | FindTransactionsInvalidPageSizeError
  | FindTransactionsInvalidStartDateSizeError
  | FindTransactionsInvalidEndDateSizeError
  | FindTransactionsInvalidInvalidTimeframeSizeError
  | SyncAccountsIntitutionNotFoundError
  | SyncTransactionsInstitutionsNotFound
  | SyncTransactionsInstitutionNotFound
  | SyncTransactionsAccountNotFound
  | FinancialProviderLinkTokenCreateError
  | FinancialProviderExchangePublicTokenError
  | FinancialProviderGetExternalAccountsError
  | FinancialProviderSyncExternalTransactionsError
  | CreateLinkTokenUserNotFoundError
  | CreateUserInvalidEmailError
  | CreateUserInvalidPasswordError
  | CreateUserPasswordTooShortError
  | CreateUserPasswordNoNumberError
  | CreateUserPasswordNoSymbolError
  | CreateUserEmailAlreadyExistsError
  | GetUserNotFoundError
  | SyncTransactionsAccountsNotFound
  | SyncTransactionsTransactionsNotFoundError;
