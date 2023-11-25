import { apiClient } from '@kaizen/ui';
import { CreateUserRequest, User } from '@kaizen/user';

export const UserService = {
  create: (request: CreateUserRequest) =>
    apiClient.post<User>('/user', request),
  createLinkToken: () => apiClient.post<string>('/user/link-token')
};
