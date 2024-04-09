import { ServiceResponse } from '@kaizen/core';
import { Service } from '@kaizen/core-server';
import {
  AccountSnapshot,
  AccountSnapshotAdapter,
  AccountSnapshotRecordAdapter,
  ICreateAccountSnapshotRepository,
  IFindAccountsRepository,
  ISnapshotAccountsService,
  SnapshotAccountsCommand
} from '@kaizen/finance';
import { v4 as uuid } from 'uuid';

export class SnapshotAccountsService
  extends Service
  implements ISnapshotAccountsService
{
  constructor(
    private readonly findAccountsRepository: IFindAccountsRepository,
    private readonly createAccountSnapshotRepository: ICreateAccountSnapshotRepository
  ) {
    super();
  }

  public async snapshot(
    command: SnapshotAccountsCommand
  ): Promise<ServiceResponse<AccountSnapshot[]>> {
    const accounts = await this.findAccountsRepository.findByUserId(command);
    if (accounts.length === 0) {
      return this.success([]);
    }

    // Unique id for this set of snapshots
    const snapshotId = uuid();
    const query = accounts.map((account) =>
      AccountSnapshotRecordAdapter.toCreateAccountSnapshotQuery(
        snapshotId,
        account
      )
    );
    const snapshots =
      await this.createAccountSnapshotRepository.bulkCreate(query);

    return this.success(
      snapshots.map(AccountSnapshotAdapter.toAccountSnapshot)
    );
  }
}
