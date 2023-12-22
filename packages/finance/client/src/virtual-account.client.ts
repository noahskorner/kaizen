import { ApiClient } from '@kaizen/core-client';
import { CreateVirtualAccountRequest, VirtualAccount } from '@kaizen/finance';
import { ApiResponse } from '@kaizen/core';
import { handleAxiosRequest } from '@kaizen/core-client';

export const VirtualAccountClient = {
  create: (
    request: CreateVirtualAccountRequest
  ): Promise<ApiResponse<VirtualAccount>> => {
    return handleAxiosRequest(() => {
      return ApiClient.post<ApiResponse<VirtualAccount>>(
        '/virtual-account',
        request
      );
    });
  }
};
