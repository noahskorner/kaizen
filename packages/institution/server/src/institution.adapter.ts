import { Account, Institution } from '@kaizen/institution';
import { AccountRecord, InstitutionRecord } from '@prisma/client';

export class InstitutionAdapter {
  public static toInstitution(
    institutionRecord: InstitutionRecord & { accounts: AccountRecord[] }
  ): Institution {
    const institution: Institution = {
      id: institutionRecord.id,
      userId: institutionRecord.userId,
      accounts: institutionRecord.accounts.map(InstitutionAdapter.toAccount)
    };
    return institution;
  }

  public static toAccount(accountRecord: AccountRecord): Account {
    const account: Account = {
      id: accountRecord.id,
      externalId: accountRecord.externalId,
      balance: {
        current: accountRecord.current,
        available: accountRecord.available
      }
    };

    return account;
  }
}
