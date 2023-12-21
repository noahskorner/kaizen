import { ApiClient } from '@kaizen/core-client';
import { FindTransactionsRequest, Transaction } from '@kaizen/finance';
import { ApiResponse, Paginated, toSearchParams } from '@kaizen/core';
import { handleAxiosRequest } from '@kaizen/core-client';

export const TransactionClient = {
  find: (
    request: FindTransactionsRequest
  ): Promise<ApiResponse<Paginated<Transaction>>> => {
    return handleAxiosRequest(() => {
      return ApiClient.get<ApiResponse<Paginated<Transaction>>>(
        `/transaction?${toSearchParams(request)}`
      );
    });
  }
};