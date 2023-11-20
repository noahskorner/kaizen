import { User } from '@kaizen/core';
import { apiClient } from '@kaizen/ui';
import { CreateUserRequest } from '@kaizen/user';

export const UserService = {
  create: (request: CreateUserRequest) => apiClient.post<User>('/user', request)
};
