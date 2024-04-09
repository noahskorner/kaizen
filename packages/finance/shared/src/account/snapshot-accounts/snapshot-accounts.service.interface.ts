import { ServiceResponse } from '@kaizen/core';
import { AccountSnapshot } from './account-snapshot';
import { SnapshotAccountsCommand } from './snapshot-accounts.command';

export interface ISnapshotAccountsService {
  snapshot(
    command: SnapshotAccountsCommand
  ): Promise<ServiceResponse<Array<AccountSnapshot>>>;
}
