import {
  AccountBase,
  AccountType,
  AccountSubtype,
  AccountBaseVerificationStatusEnum
} from 'plaid';
import { ExternalAccount } from './external-account';
import { ExternalAccountType } from './external-account-type';
import { ExternalAccountSubtype } from './external-account-subtype';
import { ExternalAccountVerificationStatus } from './external-account-verification-status';

export class ExternalAccountAdapter {
  public static toExternalAccount(account: AccountBase): ExternalAccount {
    const externalAccount: ExternalAccount = {
      externalAccountId: account.account_id,
      available: account.balances.available,
      current: account.balances.current,
      limit: account.balances.limit,
      isoCurrencyCode: account.balances.iso_currency_code,
      unofficialCurrencyCode: account.balances.unofficial_currency_code,
      externalUpdatedAt: account.balances.last_updated_datetime ?? null,
      mask: account.mask,
      name: account.name,
      officialName: account.official_name,
      type: ExternalAccountAdapter.toExternalAccountType(account.type),
      subtype: ExternalAccountAdapter.toExternalAccountSubtype(account.subtype),
      verificationStatus:
        ExternalAccountAdapter.toExternalAccountVerificationStatus(
          account.verification_status
        )
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

  public static toExternalAccountSubtype(
    subtype: AccountSubtype | null
  ): ExternalAccountSubtype | null {
    if (subtype == null) return null;

    switch (subtype) {
      case AccountSubtype._401a:
        return ExternalAccountSubtype._401a;
      case AccountSubtype._401k:
        return ExternalAccountSubtype._401k;
      case AccountSubtype._403B:
        return ExternalAccountSubtype._403B;
      case AccountSubtype._457b:
        return ExternalAccountSubtype._457b;
      case AccountSubtype._529:
        return ExternalAccountSubtype._529;
      case AccountSubtype.Brokerage:
        return ExternalAccountSubtype.Brokerage;
      case AccountSubtype.CashIsa:
        return ExternalAccountSubtype.CashIsa;
      case AccountSubtype.CryptoExchange:
        return ExternalAccountSubtype.CryptoExchange;
      case AccountSubtype.EducationSavingsAccount:
        return ExternalAccountSubtype.EducationSavingsAccount;
      case AccountSubtype.Ebt:
        return ExternalAccountSubtype.Ebt;
      case AccountSubtype.FixedAnnuity:
        return ExternalAccountSubtype.FixedAnnuity;
      case AccountSubtype.Gic:
        return ExternalAccountSubtype.Gic;
      case AccountSubtype.HealthReimbursementArrangement:
        return ExternalAccountSubtype.HealthReimbursementArrangement;
      case AccountSubtype.Hsa:
        return ExternalAccountSubtype.Hsa;
      case AccountSubtype.Isa:
        return ExternalAccountSubtype.Isa;
      case AccountSubtype.Ira:
        return ExternalAccountSubtype.Ira;
      case AccountSubtype.Lif:
        return ExternalAccountSubtype.Lif;
      case AccountSubtype.LifeInsurance:
        return ExternalAccountSubtype.LifeInsurance;
      case AccountSubtype.Lira:
        return ExternalAccountSubtype.Lira;
      case AccountSubtype.Lrif:
        return ExternalAccountSubtype.Lrif;
      case AccountSubtype.Lrsp:
        return ExternalAccountSubtype.Lrsp;
      case AccountSubtype.NonCustodialWallet:
        return ExternalAccountSubtype.NonCustodialWallet;
      case AccountSubtype.NonTaxableBrokerageAccount:
        return ExternalAccountSubtype.NonTaxableBrokerageAccount;
      case AccountSubtype.Other:
        return ExternalAccountSubtype.Other;
      case AccountSubtype.OtherInsurance:
        return ExternalAccountSubtype.OtherInsurance;
      case AccountSubtype.OtherAnnuity:
        return ExternalAccountSubtype.OtherAnnuity;
      case AccountSubtype.Prif:
        return ExternalAccountSubtype.Prif;
      case AccountSubtype.Rdsp:
        return ExternalAccountSubtype.Rdsp;
      case AccountSubtype.Resp:
        return ExternalAccountSubtype.Resp;
      case AccountSubtype.Rlif:
        return ExternalAccountSubtype.Rlif;
      case AccountSubtype.Rrif:
        return ExternalAccountSubtype.Rrif;
      case AccountSubtype.Pension:
        return ExternalAccountSubtype.Pension;
      case AccountSubtype.ProfitSharingPlan:
        return ExternalAccountSubtype.ProfitSharingPlan;
      case AccountSubtype.Retirement:
        return ExternalAccountSubtype.Retirement;
      case AccountSubtype.Roth:
        return ExternalAccountSubtype.Roth;
      case AccountSubtype.Roth401k:
        return ExternalAccountSubtype.Roth401k;
      case AccountSubtype.Rrsp:
        return ExternalAccountSubtype.Rrsp;
      case AccountSubtype.SepIra:
        return ExternalAccountSubtype.SepIra;
      case AccountSubtype.SimpleIra:
        return ExternalAccountSubtype.SimpleIra;
      case AccountSubtype.Sipp:
        return ExternalAccountSubtype.Sipp;
      case AccountSubtype.StockPlan:
        return ExternalAccountSubtype.StockPlan;
      case AccountSubtype.ThriftSavingsPlan:
        return ExternalAccountSubtype.ThriftSavingsPlan;
      case AccountSubtype.Tfsa:
        return ExternalAccountSubtype.Tfsa;
      case AccountSubtype.Trust:
        return ExternalAccountSubtype.Trust;
      case AccountSubtype.Ugma:
        return ExternalAccountSubtype.Ugma;
      case AccountSubtype.Utma:
        return ExternalAccountSubtype.Utma;
      case AccountSubtype.VariableAnnuity:
        return ExternalAccountSubtype.VariableAnnuity;
      case AccountSubtype.CreditCard:
        return ExternalAccountSubtype.CreditCard;
      case AccountSubtype.Paypal:
        return ExternalAccountSubtype.Paypal;
      case AccountSubtype.Cd:
        return ExternalAccountSubtype.Cd;
      case AccountSubtype.Checking:
        return ExternalAccountSubtype.Checking;
      case AccountSubtype.Savings:
        return ExternalAccountSubtype.Savings;
      case AccountSubtype.MoneyMarket:
        return ExternalAccountSubtype.MoneyMarket;
      case AccountSubtype.Prepaid:
        return ExternalAccountSubtype.Prepaid;
      case AccountSubtype.Auto:
        return ExternalAccountSubtype.Auto;
      case AccountSubtype.Business:
        return ExternalAccountSubtype.Business;
      case AccountSubtype.Commercial:
        return ExternalAccountSubtype.Commercial;
      case AccountSubtype.Construction:
        return ExternalAccountSubtype.Construction;
      case AccountSubtype.Consumer:
        return ExternalAccountSubtype.Consumer;
      case AccountSubtype.HomeEquity:
        return ExternalAccountSubtype.HomeEquity;
      case AccountSubtype.Loan:
        return ExternalAccountSubtype.Loan;
      case AccountSubtype.Mortgage:
        return ExternalAccountSubtype.Mortgage;
      case AccountSubtype.Overdraft:
        return ExternalAccountSubtype.Overdraft;
      case AccountSubtype.LineOfCredit:
        return ExternalAccountSubtype.LineOfCredit;
      case AccountSubtype.Student:
        return ExternalAccountSubtype.Student;
      case AccountSubtype.CashManagement:
        return ExternalAccountSubtype.CashManagement;
      case AccountSubtype.Keogh:
        return ExternalAccountSubtype.Keogh;
      case AccountSubtype.MutualFund:
        return ExternalAccountSubtype.MutualFund;
      case AccountSubtype.Recurring:
        return ExternalAccountSubtype.Recurring;
      case AccountSubtype.Rewards:
        return ExternalAccountSubtype.Rewards;
      case AccountSubtype.SafeDeposit:
        return ExternalAccountSubtype.SafeDeposit;
      case AccountSubtype.Sarsep:
        return ExternalAccountSubtype.Sarsep;
      case AccountSubtype.Payroll:
        return ExternalAccountSubtype.Payroll;
      case AccountSubtype.Null:
        return ExternalAccountSubtype.Null;
      default:
        return null;
    }
  }

  public static toExternalAccountVerificationStatus(
    status: AccountBaseVerificationStatusEnum | undefined
  ): ExternalAccountVerificationStatus | null {
    if (status == null) return null;

    switch (status) {
      case AccountBaseVerificationStatusEnum.AutomaticallyVerified:
        return ExternalAccountVerificationStatus.AutomaticallyVerified;
      case AccountBaseVerificationStatusEnum.PendingAutomaticVerification:
        return ExternalAccountVerificationStatus.PendingAutomaticVerification;
      case AccountBaseVerificationStatusEnum.PendingManualVerification:
        return ExternalAccountVerificationStatus.PendingManualVerification;
      case AccountBaseVerificationStatusEnum.ManuallyVerified:
        return ExternalAccountVerificationStatus.ManuallyVerified;
      case AccountBaseVerificationStatusEnum.VerificationExpired:
        return ExternalAccountVerificationStatus.VerificationExpired;
      case AccountBaseVerificationStatusEnum.VerificationFailed:
        return ExternalAccountVerificationStatus.VerificationFailed;
      case AccountBaseVerificationStatusEnum.DatabaseMatched:
        return ExternalAccountVerificationStatus.DatabaseMatched;
      default:
        return null;
    }
  }
}
