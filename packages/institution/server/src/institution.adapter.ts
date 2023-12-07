import { Institution } from '@kaizen/institution';
import { AccountRecord, InstitutionRecord } from '@prisma/client';
import { AccountAdapter } from './account.adapter';

export class InstitutionAdapter {
  public static toInstitution(
    institutionRecord: InstitutionRecord & { accounts: AccountRecord[] }
  ): Institution {
    const institution: Institution = {
      id: institutionRecord.id,
      userId: institutionRecord.userId,
      accounts: institutionRecord.accounts.map(AccountAdapter.toAccount)
    };
    return institution;
  }
}
