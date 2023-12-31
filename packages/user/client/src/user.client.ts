import { ApiResponse } from '@kaizen/core';
import { ApiClient, handleAxiosRequest } from '@kaizen/core-client';
import { CreateUserRequest, LinkToken, User } from '@kaizen/user';

export const UserClient = {
  create: (request: CreateUserRequest): Promise<ApiResponse<User>> => {
    return handleAxiosRequest(() => {
      return ApiClient.post<ApiResponse<User>>('/user', request);
    });
  },
  createLinkToken: (): Promise<ApiResponse<LinkToken>> => {
    return handleAxiosRequest(() => {
      return ApiClient.post<ApiResponse<LinkToken>>('/user/link-token');
    });
  }
};
