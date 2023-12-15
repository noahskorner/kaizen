import { AccountRecord, AccountRecordType } from '@kaizen/data';
import { Account } from '@kaizen/institution';
import { ExternalAccountType } from '@kaizen/provider';
import { AccountType } from 'plaid';

export class AccountAdapter {
  public static toAccount(accountRecord: AccountRecord): Account {
    const account: Account = {
      id: accountRecord.id,
      externalId: accountRecord.externalId,
      type: AccountAdapter.toAccountType(accountRecord.type),
      balance: {
        current: accountRecord.current,
        available: accountRecord.available
      }
    };

    return account;
  }

  public static toAccountType(type: AccountRecordType): AccountType {
    switch (type) {
      case AccountRecordType.Credit:
        return AccountType.Credit;
      case AccountRecordType.Depository:
        return AccountType.Depository;
      case AccountRecordType.Investment:
        return AccountType.Investment;
      case AccountRecordType.Loan:
        return AccountType.Loan;
      case AccountRecordType.Other:
        return AccountType.Other;
      default:
        return AccountType.Other;
    }
  }

  public static toAccountRecordType(
    type: ExternalAccountType
  ): AccountRecordType {
    switch (type) {
      case ExternalAccountType.Depository:
        return AccountRecordType.Depository;
      case ExternalAccountType.Credit:
        return AccountRecordType.Credit;
      case ExternalAccountType.Investment:
        return AccountRecordType.Investment;
      case ExternalAccountType.Loan:
        return AccountRecordType.Loan;
      case ExternalAccountType.Other:
        return AccountRecordType.Other;
      default:
        return AccountRecordType.Other;
    }
  }
}
