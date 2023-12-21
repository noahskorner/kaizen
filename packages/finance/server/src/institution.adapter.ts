import { Institution } from '@kaizen/finance';
import { AccountAdapter } from './account.adapter';
import { InstitutionRecord } from '@kaizen/data';

export class InstitutionAdapter {
  public static toInstitution(
    institutionRecord: InstitutionRecord
  ): Institution {
    const institution: Institution = {
      id: institutionRecord.id,
      userId: institutionRecord.userId,
      accounts: institutionRecord.accounts.map(AccountAdapter.toAccount)
    };
    return institution;
  }
}
