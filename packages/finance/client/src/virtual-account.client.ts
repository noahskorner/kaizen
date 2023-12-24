import { ApiClient, handleAxiosRequest } from '@kaizen/core-client';
import { CreateVirtualAccountRequest, VirtualAccount } from '@kaizen/finance';
import { ApiResponse } from '@kaizen/core';

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
  },
  find: (): Promise<ApiResponse<VirtualAccount[]>> => {
    return handleAxiosRequest(() => {
      return ApiClient.get<ApiResponse<VirtualAccount[]>>('/virtual-account');
    });
  }
};
