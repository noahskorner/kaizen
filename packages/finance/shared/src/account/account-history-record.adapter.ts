import { AccountRecord } from './account-record';
import { CreateAccountHistoryQuery } from './create-account-history/create-account-history.query';

export class AccountHistoryRecordAdapter {
  public static toCreateAccountHistoryQuery(
    snapshotId: string,
    accountRecord: AccountRecord
  ): CreateAccountHistoryQuery {
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
    } satisfies CreateAccountHistoryQuery;
  }
}
