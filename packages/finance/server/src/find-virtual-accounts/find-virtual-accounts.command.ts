import { FindVirtualAccountsRequest } from '@kaizen/finance';

export interface FindVirtualAccountsCommand extends FindVirtualAccountsRequest {
  userId: string;
}
