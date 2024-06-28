import { ApiClient, handleAxiosRequest } from '@kaizen/core-client';
import { AccountSnapshot, FindAccountHistoryRequest } from '@kaizen/finance';
import { Paginated, toSearchParams, ApiResponse } from '@kaizen/core';

export const FindAccountHistoryClient = {
  find: (
    request: FindAccountHistoryRequest
  ): Promise<ApiResponse<Paginated<AccountSnapshot>>> => {
    return handleAxiosRequest(() => {
      return ApiClient.get<ApiResponse<Paginated<AccountSnapshot>>>(
        `/account/history?${toSearchParams(request)}`
      );
    });
  }
};
