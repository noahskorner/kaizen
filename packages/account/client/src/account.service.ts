import { apiClient } from '@kaizen/ui';
import { CreateAccountRequest, Account } from '@kaizen/account';

export const AccountService = {
  create: (request: CreateAccountRequest) =>
    apiClient.post<Account>('/account', request),
  find: () => apiClient.get<Account[]>('/account')
};
