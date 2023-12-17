import { AccountBase, AccountType } from 'plaid';
import { ExternalAccount } from './external-account';
import { ExternalAccountType } from './external-account-type';

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
}
