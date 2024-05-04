import { ErrorCode } from './error-code';

export interface RefreshTokenExpiredError {
  code: ErrorCode.REFRESH_TOKEN_EXPIRED;
  params: {
    expiredAt: string;
  };
}

export interface CreateAccountInvalidPlaidPublicTokenError {
  code: ErrorCode.CREATE_ACCOUNT_INVALID_PLAID_PUBLIC_TOKEN;
  params: {
    plaidPublicToken: string;
  };
}

export interface CreateVirtualAccountInvalidNameError {
  code: ErrorCode.CREATE_VIRTUAL_ACCOUNT_INVALID_NAME;
  params: {
    name: string;
  };
}

export interface CreateVirtualAccountInvalidBalanceError {
  code: ErrorCode.CREATE_VIRTUAL_ACCOUNT_INVALID_BALANCE;
  params: {
    balance: number;
  };
}

export interface CreateVirtualAccountInvalidAmountError {
  code: ErrorCode.CREATE_VIRTUAL_ACCOUNT_INVALID_AMOUNT;
  params: {
    amount: number;
  };
}

export interface CreateVirtualAccountInvalidFrequencyError {
  code: ErrorCode.CREATE_VIRTUAL_ACCOUNT_INVALID_FREQUENCY;
  params: {
    frequency: number;
  };
}

export interface FindTransactionsInvalidPageError {
  code: ErrorCode.FIND_TRANSACTIONS_INVALID_PAGE;
  params: {
    page: number;
  };
}

export interface FindTransactionsInvalidPageSizeError {
  code: ErrorCode.FIND_TRANSACTIONS_INVALID_PAGE_SIZE;
  params: {
    pageSize: number;
  };
}

export interface FindTransactionsInvalidStartDateSizeError {
  code: ErrorCode.FIND_TRANSACTIONS_INVALID_START_DATE;
  params: {
    startDate?: string;
  };
}

export interface FindTransactionsInvalidEndDateSizeError {
  code: ErrorCode.FIND_TRANSACTIONS_INVALID_END_DATE;
  params: {
    endDate?: string;
  };
}

export interface FindTransactionsInvalidInvalidTimeframeError {
  code: ErrorCode.FIND_TRANSACTIONS_INVALID_TIMEFRAME;
  params: {
    startDate?: string;
    endDate?: string;
  };
}

export interface FindExpensesInvalidStartDateError {
  code: ErrorCode.FIND_EXPENSES_INVALID_START_DATE;
  params: {
    startDate?: string;
  };
}

export interface FindExpensesInvalidEndDateError {
  code: ErrorCode.FIND_EXPENSES_INVALID_END_DATE;
  params: {
    endDate?: string;
  };
}

export interface FindExpensesInvalidTimeframeError {
  code: ErrorCode.FIND_EXPENSES_INVALID_TIMEFRAME;
  params: {
    startDate?: string;
    endDate?: string;
  };
}

export interface SyncAccountsIntitutionNotFoundError {
  code: ErrorCode.SYNC_ACCOUNTS_INSTITUTION_NOT_FOUND;
  params: {
    instiutionIds: string[];
  };
}

export interface SyncTransactionsInstitutionsNotFound {
  code: ErrorCode.SYNC_TRANSACTIONS_INSTITUTIONS_NOT_FOUND;
  params: {
    institutionIds: string[];
  };
}

export interface SyncTransactionsInstitutionNotFound {
  code: ErrorCode.SYNC_TRANSACTIONS_INSTITUTION_NOT_FOUND;
  params: {
    institutionId: string;
  };
}

export interface SyncTransactionsAccountsNotFound {
  code: ErrorCode.SYNC_TRANSACTIONS_ACCOUNTS_NOT_FOUND;
  params: {
    externalAccountIds: string[];
  };
}

export interface SyncTransactionsAccountNotFound {
  code: ErrorCode.SYNC_TRANSACTIONS_ACCOUNT_NOT_FOUND;
  params: {
    accountId: string;
  };
}

export interface FinancialProviderLinkTokenCreateError {
  code: ErrorCode.FINANCIAL_PROVIDER_LINK_TOKEN_CREATE;
  params: {
    userId: string;
    response?: unknown;
    error?: unknown;
  };
}

export interface FinancialProviderExchangePublicTokenError {
  code: ErrorCode.FINANCIAL_PROVIDER_EXCHANGE_PUBLIC_TOKEN;
  params: {
    publicToken: string;
    response?: unknown;
    error?: unknown;
  };
}

export interface FinancialProviderGetExternalAccountsError {
  code: ErrorCode.FINANCIAL_PROVIDER_GET_EXTERNAL_ACCOUNTS;
  params: {
    accessToken: string;
    response?: unknown;
    error?: unknown;
  };
}

export interface FinancialProviderSyncExternalTransactionsError {
  code: ErrorCode.FINANCIAL_PROVIDER_SYNC_EXTERNAL_TRANSACTIONS;
  params: {
    accessToken: string;
    cursor: string | null;
    response?: unknown;
    error?: unknown;
  };
}

export interface CreateLinkTokenUserNotFoundError {
  code: ErrorCode.CREATE_LINK_TOKEN_USER_NOT_FOUND;
  params: {
    userId: string;
  };
}

export interface CreateUserInvalidEmailError {
  code: ErrorCode.CREATE_USER_INVALID_EMAIL;
  params: {
    email: string;
  };
}

export interface CreateUserInvalidPasswordError {
  code: ErrorCode.CREATE_USER_INVALID_PASSWORD;
  params: {
    password: string;
  };
}

export interface CreateUserPasswordTooShortError {
  code: ErrorCode.CREATE_USER_PASSWORD_TOO_SHORT;
  params: {
    password: string;
  };
}

export interface CreateUserPasswordNoNumberError {
  code: ErrorCode.CREATE_USER_PASSWORD_NO_NUMBER;
  params: {
    password: string;
  };
}

export interface CreateUserPasswordNoSymbolError {
  code: ErrorCode.CREATE_USER_PASSWORD_NO_SYMBOL;
  params: {
    password: string;
  };
}

export interface CreateUserEmailAlreadyExistsError {
  code: ErrorCode.CREATE_USER_EMAIL_ALREADY_EXISTS;
  params: {
    email: string;
  };
}

export interface GetUserNotFoundError {
  code: ErrorCode.GET_USER_NOT_FOUND;
  params: {
    userId: string;
  };
}

export interface SyncTransactionsTransactionsNotFoundError {
  code: ErrorCode.SYNC_TRANSACTIONS_TRANSACTIONS_NOT_FOUND;
  params: {
    externalTransactionIds: string[];
  };
}

export interface CreateWalletMustProvideUserIdError {
  code: ErrorCode.CREATE_WALLET_MUST_PROVIDE_USER_ID;
  params: {
    userId: string;
  };
}

export interface CreateWalletAlreadyExistsError {
  code: ErrorCode.CREATE_WALLET_ALREADY_EXISTS_FOR_USER;
  params: {
    userId: string;
  };
}

export interface UpdateWalletNotFoundError {
  code: ErrorCode.UPDATE_WALLET_NOT_FOUND;
  params: {
    userId: string;
  };
}

export interface UpdateWalletMustProvideUniqueTransactionIdError {
  code: ErrorCode.UPDATE_WALLET_MUST_PROVIDE_UNIQUE_TRANSACTION_ID;
  params: {
    userId: string;
    transactionId: unknown;
  };
}

export interface UpdateWalletMustProvideAmountError {
  code: ErrorCode.UPDATE_WALLET_MUST_PROVIDE_AMOUNT;
  params: {
    userId: string;
    transactionId: string;
    amount: unknown;
  };
}

export interface UpdateWalletTransactionAlreadyExistsError {
  code: ErrorCode.UPDATE_WALLET_TRANSACTION_ALREADY_EXISTS;
  params: {
    walletId: string;
    transactionId: string;
    amount: number;
  };
}

export interface UpdateWalletNotEnoughFundsError {
  code: ErrorCode.UPDATE_WALLET_NOT_ENOUGH_FUNDS;
  params: {
    walletId: string;
    transactionId: string;
    amount: number;
  };
}

export interface GetWalletNotFoundError {
  code: ErrorCode.GET_WALLET_NOT_FOUND;
  params: {
    userId: string;
  };
}

export interface GetWalletNotYourWalletError {
  code: ErrorCode.GET_WALLET_NOT_YOUR_WALLET;
}

export interface UpdateCategoryNotFoundError {
  code: ErrorCode.UPDATE_CATEGORY_NOT_FOUND;
  params: {
    userId: string;
    transactionId: string;
    categoryId: string;
  };
}

export interface BaseError {
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
    | ErrorCode.CREATE_WALLET_ALREADY_EXISTS_FOR_USER
    | ErrorCode.UPDATE_WALLET_NOT_FOUND
    | ErrorCode.UPDATE_WALLET_MUST_PROVIDE_UNIQUE_TRANSACTION_ID
    | ErrorCode.UPDATE_WALLET_MUST_PROVIDE_AMOUNT
    | ErrorCode.UPDATE_WALLET_TRANSACTION_ALREADY_EXISTS
    | ErrorCode.UPDATE_WALLET_NOT_ENOUGH_FUNDS
    | ErrorCode.GET_WALLET_NOT_FOUND
    | ErrorCode.GET_WALLET_NOT_YOUR_WALLET
    | ErrorCode.FIND_EXPENSES_INVALID_START_DATE
    | ErrorCode.FIND_EXPENSES_INVALID_END_DATE
    | ErrorCode.FIND_EXPENSES_INVALID_TIMEFRAME
    | ErrorCode.UPDATE_CATEGORY_NOT_FOUND
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
  | FindTransactionsInvalidInvalidTimeframeError
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
  | SyncTransactionsTransactionsNotFoundError
  | CreateWalletMustProvideUserIdError
  | CreateWalletAlreadyExistsError
  | UpdateWalletNotFoundError
  | UpdateWalletMustProvideUniqueTransactionIdError
  | UpdateWalletMustProvideAmountError
  | UpdateWalletTransactionAlreadyExistsError
  | UpdateWalletNotEnoughFundsError
  | GetWalletNotFoundError
  | GetWalletNotYourWalletError
  | FindExpensesInvalidStartDateError
  | FindExpensesInvalidEndDateError
  | FindExpensesInvalidTimeframeError
  | UpdateCategoryNotFoundError;
