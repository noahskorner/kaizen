import { AccountSnapshotRecord } from './account-snapshot-record';
import { CreateAccountSnapshotQuery } from './create-account-snapshot.query';

export interface ICreateAccountSnapshotRepository {
  bulkCreate(
    query: Array<CreateAccountSnapshotQuery>
  ): Promise<Array<AccountSnapshotRecord>>;
}
