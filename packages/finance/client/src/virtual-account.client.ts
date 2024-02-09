import { ApiClient, handleAxiosRequest } from '@kaizen/core-client';
import { CreateVirtualAccountRequest, VirtualAccount } from '@kaizen/finance';
import { ServiceResponse } from '@kaizen/core';

export const VirtualAccountClient = {
  create: (
    request: CreateVirtualAccountRequest
  ): Promise<ServiceResponse<VirtualAccount>> => {
    return handleAxiosRequest(() => {
      return ApiClient.post<ServiceResponse<VirtualAccount>>(
        '/virtual-account',
        request
      );
    });
  },
  find: (): Promise<ServiceResponse<VirtualAccount[]>> => {
    return handleAxiosRequest(() => {
      return ApiClient.get<ServiceResponse<VirtualAccount[]>>(
        '/virtual-account'
      );
    });
  }
};
