import { ServiceResponse } from '@kaizen/core';
import { ApiClient, handleAxiosRequest } from '@kaizen/core-client';
import { CreateUserRequest, LinkToken, User } from '@kaizen/user';

export const UserClient = {
  create: (request: CreateUserRequest): Promise<ServiceResponse<User>> => {
    return handleAxiosRequest(() => {
      return ApiClient.post<ServiceResponse<User>>('/user', request);
    });
  },
  createLinkToken: (): Promise<ServiceResponse<LinkToken>> => {
    return handleAxiosRequest(() => {
      return ApiClient.post<ServiceResponse<LinkToken>>('/user/link-token');
    });
  }
};
