import { ApiClient } from '@kaizen/ui';
import { FindTransactionsRequest, Transaction } from '@kaizen/finance';
import {
  ApiResponse,
  Paginated,
  handleAxiosRequest,
  toSearchParams
} from '@kaizen/core';

export const TransactionService = {
  find: (
    request: FindTransactionsRequest
  ): Promise<ApiResponse<Paginated<Transaction>>> => {
    return handleAxiosRequest(() => {
      return ApiClient.get<ApiResponse<Paginated<Transaction>>>(
        `/finance/transaction?${toSearchParams(request)}`
      );
    });
  }
};
