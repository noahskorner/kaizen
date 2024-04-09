import { AccountAdapter } from '../account.adapter';
import { AccountSnapshot } from './account-snapshot';
import { AccountSnapshotRecord } from './account-snapshot-record';

export class AccountSnapshotAdapter {
  public static toAccountSnapshot(
    accountSnapshotRecord: AccountSnapshotRecord
  ): AccountSnapshot {
    const account: AccountSnapshot = {
      id: accountSnapshotRecord.id,
      createdAt: accountSnapshotRecord.createdAt.toISOString(),
      snapshotId: accountSnapshotRecord.snapshotId,
      accountId: accountSnapshotRecord.accountId,
      externalId: accountSnapshotRecord.externalId,
      available: accountSnapshotRecord.available,
      current: accountSnapshotRecord.current,
      limit: accountSnapshotRecord.limit,
      isoCurrencyCode: accountSnapshotRecord.isoCurrencyCode,
      unofficialCurrencyCode: accountSnapshotRecord.unofficialCurrencyCode,
      mask: accountSnapshotRecord.mask,
      name: accountSnapshotRecord.name,
      officialName: accountSnapshotRecord.officialName,
      type: AccountAdapter.toAccountType(accountSnapshotRecord.type),
      subtype: AccountAdapter.toAccountSubtype(accountSnapshotRecord.subtype),
      verificationStatus: AccountAdapter.toAccountVerificationStatus(
        accountSnapshotRecord.verificationStatus
      )
    };

    return account;
  }
}
