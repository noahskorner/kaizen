import { ApiClient, handleAxiosRequest } from '@kaizen/core-client';
import { Transaction, UpdateTransactionRequest } from '@kaizen/finance';
import { ApiResponse } from '@kaizen/core';

export const UpdateTransactionClient = {
  update: (
    request: UpdateTransactionRequest
  ): Promise<ApiResponse<Transaction>> => {
    return handleAxiosRequest(() => {
      return ApiClient.put<ApiResponse<Transaction>>(
        `/transaction/${request.id}`,
        request
      );
    });
  }
};
