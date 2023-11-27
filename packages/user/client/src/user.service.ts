import { apiClient } from '@kaizen/ui';
import { CreateUserRequest, LinkToken, User } from '@kaizen/user';

export const UserService = {
  create: (request: CreateUserRequest) =>
    apiClient.post<User>('/user', request),
  createLinkToken: () => apiClient.post<LinkToken>('/user/link-token')
};
