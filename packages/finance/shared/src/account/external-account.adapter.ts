import { AccountBase, AccountType } from 'plaid';
import { ExternalAccount } from './external-account';
import { ExternalAccountType } from './external-account-type';
import { AccountRecordType } from './account-record-type';
import { CreateAccountQuery } from './sync-accounts/create-account.query';
import { UpdateAccountQuery } from './sync-accounts/update-account.query';

export class ExternalAccountAdapter {
  public static toExternalAccount(account: AccountBase): ExternalAccount {
    const externalAccount: ExternalAccount = {
      id: account.account_id,
      type: ExternalAccountAdapter.toExternalAccountType(account.type),
      current: account.balances.current ?? 0,
      available: account.balances.available ?? 0,
      currency: account.balances.iso_currency_code
    };
    return externalAccount;
  }

  public static toExternalAccountType(type: AccountType): ExternalAccountType {
    switch (type) {
      case AccountType.Credit:
        return ExternalAccountType.Credit;
      case AccountType.Depository:
        return ExternalAccountType.Depository;
      case AccountType.Investment:
        return ExternalAccountType.Investment;
      case AccountType.Loan:
        return ExternalAccountType.Loan;
      case AccountType.Other:
        return ExternalAccountType.Other;
      default:
        return ExternalAccountType.Other;
    }
  }

  public static toCreateAccountQuery(
    institutionId: string,
    externalAccount: ExternalAccount
  ): CreateAccountQuery {
    const createAccountQuery: CreateAccountQuery = {
      institutionId: institutionId,
      externalId: externalAccount.id,
      type: ExternalAccountAdapter.toAccountRecordType(externalAccount.type),
      current: externalAccount.current,
      available: externalAccount.available,
      currency: externalAccount.currency
    };

    return createAccountQuery;
  }

  public static toUpdateAccountQuery(
    institutionId: string,
    accountId: string,
    externalAccount: ExternalAccount
  ) {
    const updateAccountQuery: UpdateAccountQuery = {
      id: accountId,
      ...ExternalAccountAdapter.toCreateAccountQuery(
        institutionId,
        externalAccount
      )
    };

    return updateAccountQuery;
  }

  public static toAccountRecordType(
    externalAccountType: ExternalAccountType
  ): AccountRecordType {
    switch (externalAccountType) {
      case ExternalAccountType.Credit:
        return AccountRecordType.Credit;
      case ExternalAccountType.Depository:
        return AccountRecordType.Depository;
      case ExternalAccountType.Investment:
        return AccountRecordType.Investment;
      case ExternalAccountType.Loan:
        return AccountRecordType.Loan;
      case ExternalAccountType.Brokerage:
        return AccountRecordType.Brokerage;
      case ExternalAccountType.Other:
        return AccountRecordType.Other;
      default:
        return AccountRecordType.Other;
    }
  }
}
