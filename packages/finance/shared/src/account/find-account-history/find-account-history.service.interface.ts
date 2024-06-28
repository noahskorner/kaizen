import { Paginated, ServiceResponse } from '@kaizen/core';
import { AccountSnapshot } from '../snapshot-accounts';
import { FindAccountHistoryCommand } from './find-account-history.command';

export interface IFindAccountHistoryService {
  find(
    command: FindAccountHistoryCommand
  ): Promise<ServiceResponse<Paginated<AccountSnapshot>>>;
}
