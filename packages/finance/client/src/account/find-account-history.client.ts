import { ApiClient, handleAxiosRequest } from '@kaizen/core-client';
import { AccountHistory, FindAccountHistoryRequest } from '@kaizen/finance';
import { Paginated, toSearchParams, ApiResponse } from '@kaizen/core';

export const FindAccountHistoryClient = {
  find: (
    request: FindAccountHistoryRequest
  ): Promise<ApiResponse<Paginated<AccountHistory>>> => {
    return handleAxiosRequest(() => {
      return ApiClient.get<ApiResponse<Paginated<AccountHistory>>>(
        `/account/history?${toSearchParams(request)}`
      );
    });
  }
};
