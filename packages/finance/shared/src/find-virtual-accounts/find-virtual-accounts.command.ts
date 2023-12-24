import { FindVirtualAccountsRequest } from './find-virtual-accounts.request';

export interface FindVirtualAccountsCommand extends FindVirtualAccountsRequest {
  userId: string;
}
