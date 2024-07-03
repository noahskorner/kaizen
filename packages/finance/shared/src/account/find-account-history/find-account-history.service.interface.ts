import { Paginated, ServiceResponse } from '@kaizen/core';
import { FindAccountHistoryCommand } from './find-account-history.command';
import { AccountHistory } from '../account-history';

export interface IFindAccountHistoryService {
  find(
    command: FindAccountHistoryCommand
  ): Promise<ServiceResponse<Paginated<AccountHistory>>>;
}
