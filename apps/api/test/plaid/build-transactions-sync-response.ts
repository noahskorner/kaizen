import { TransactionsSyncResponse } from 'plaid';

export const buildTransactionsSyncResponse = (
  overrides: Partial<TransactionsSyncResponse> = {}
): TransactionsSyncResponse => {
  const transactionsSyncResponse: TransactionsSyncResponse = {
    request_id: '',
    next_cursor: '',
    has_more: false,
    added: [],
    modified: [],
    removed: [],
    ...overrides
  };

  return {
    ...transactionsSyncResponse,
    ...overrides
  };
};
