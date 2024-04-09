import { AccountRecord } from '../account-record';
import { CreateAccountSnapshotQuery } from './create-account-snapshot.query';

export class AccountSnapshotRecordAdapter {
  public static toCreateAccountSnapshotQuery(
    snapshotId: string,
    accountRecord: AccountRecord
  ): CreateAccountSnapshotQuery {
    return {
      snapshotId: snapshotId,
      accountId: accountRecord.id,
      externalId: accountRecord.externalId,
      available: accountRecord.available,
      current: accountRecord.current,
      limit: accountRecord.limit,
      isoCurrencyCode: accountRecord.isoCurrencyCode,
      unofficialCurrencyCode: accountRecord.unofficialCurrencyCode,
      mask: accountRecord.mask,
      name: accountRecord.name,
      officialName: accountRecord.officialName,
      type: accountRecord.type,
      subtype: accountRecord.subtype,
      verificationStatus: accountRecord.verificationStatus
    } satisfies CreateAccountSnapshotQuery;
  }
}
