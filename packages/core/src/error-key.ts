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
  CREATE_LINK_TOKEN_USER_ALREADY_HAS_TOKEN = 'CREATE_LINK_TOKEN_USER_ALREADY_HAS_TOKEN'
}
