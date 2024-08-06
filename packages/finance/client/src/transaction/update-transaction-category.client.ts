import { ApiClient, handleAxiosRequest } from '@kaizen/core-client';
import { Transaction, UpdateTransactionCategoryRequest } from '@kaizen/finance';
import { ApiResponse } from '@kaizen/core';

export const UpdateTransactionCategoryClient = {
  update: (
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
