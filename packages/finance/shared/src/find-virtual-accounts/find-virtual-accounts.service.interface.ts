import { ApiResponse } from '@kaizen/core';
import { VirtualAccount } from '../virtual-account';
import { FindVirtualAccountsCommand } from './find-virtual-accounts.command';

export interface IFindVirtualAccountsService {
  find(
    command: FindVirtualAccountsCommand
  ): Promise<ApiResponse<VirtualAccount[]>>;
}
