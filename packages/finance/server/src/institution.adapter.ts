import { Institution, InstitutionRecord } from '@kaizen/finance';
import { AccountAdapter } from './account.adapter';

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
