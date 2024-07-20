import { ApiClient, handleAxiosRequest } from '@kaizen/core-client';
import { DeleteAccountRequest } from '@kaizen/finance';
import { ApiResponse } from '@kaizen/core';

export const DeleteAccountClient = {
  delete: (request: DeleteAccountRequest): Promise<ApiResponse<true>> => {
    return handleAxiosRequest(() => {
      return ApiClient.delete<ApiResponse<true>>(
        `/account/${request.accountId}`
      );
    });
  }
};
