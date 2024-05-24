import { ApiClient, handleAxiosRequest } from '@kaizen/core-client';
import {
  FindTransactionsRequest,
  Transaction,
  UpdateTransactionCategoryRequest
} from '@kaizen/finance';
import { Paginated, toSearchParams, ApiResponse } from '@kaizen/core';

export const TransactionClient = {
  find: (
    request: FindTransactionsRequest
  ): Promise<ApiResponse<Paginated<Transaction>>> => {
    return handleAxiosRequest(() => {
      return ApiClient.get<ApiResponse<Paginated<Transaction>>>(
        `/transaction?${toSearchParams(request)}`
      );
    });
  },
  updateCategory: (
    request: UpdateTransactionCategoryRequest
  ): Promise<ApiResponse<Transaction>> => {
    return handleAxiosRequest(() => {
      return ApiClient.put<ApiResponse<Transaction>>(
        `/transaction/${request.transactionId}/category`,
        request
      );
    });
  }
};
