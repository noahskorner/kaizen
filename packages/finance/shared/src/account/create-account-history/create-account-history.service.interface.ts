import { ServiceResponse } from '@kaizen/core';
import { AccountHistory } from '../account-history';
import { CreateAccountHistoryCommand } from './create-account-history.command';

export interface ICreateAccountHistoryService {
  create(
    command: CreateAccountHistoryCommand
  ): Promise<ServiceResponse<Array<AccountHistory>>>;
}
