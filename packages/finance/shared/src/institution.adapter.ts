import { Account } from './account';
import { AccountAdapter } from './account.adapter';
import { Institution } from './institution';
import { InstitutionRecord } from './institution-record';

export class InstitutionAdapter {
  public static toInstitution(
    institutionRecord: InstitutionRecord,
    accounts?: Account[]
  ): Institution {
    const institution: Institution = {
      id: institutionRecord.id,
      userId: institutionRecord.userId,
      accounts:
        accounts ?? institutionRecord.accounts.map(AccountAdapter.toAccount)
    };
    return institution;
  }
}
