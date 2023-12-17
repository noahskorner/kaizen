import { ApiResponse, handleAxiosRequest } from '@kaizen/core';
import { ApiClient } from '@kaizen/ui';
import { CreateUserRequest, LinkToken, User } from '@kaizen/user';

export const UserService = {
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
