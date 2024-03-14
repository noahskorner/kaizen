import { ExternalAccount } from './external-account';
import { ExternalAccountSubtype } from './external-account-subtype';
import { CreateAccountQuery } from './sync-accounts/create-account.query';
import { AccountRecordSubtype } from './account-record-subtype';
import { ExternalAccountVerificationStatus } from './external-account-verification-status';
import { AccountRecordVerificationStatus } from './account-record-verification-status';
import { UpdateAccountQuery } from './sync-accounts/update-account.query';
import { ExternalAccountType } from './external-account-type';
import { AccountRecordType } from './account-record-type';

export class AccountRecordAdapter {
  public static toCreateAccountQuery(
    institutionId: string,
    externalAccount: ExternalAccount
  ): CreateAccountQuery {
    const createAccountQuery: CreateAccountQuery = {
      institutionId: institutionId,
      externalId: externalAccount.externalAccountId,
      available: externalAccount.available,
      current: externalAccount.current,
      limit: externalAccount.limit,
      isoCurrencyCode: externalAccount.isoCurrencyCode,
      unofficialCurrencyCode: externalAccount.unofficialCurrencyCode,
      externalUpdatedAt: externalAccount.externalUpdatedAt,
      mask: externalAccount.mask,
      name: externalAccount.name,
      officialName: externalAccount.officialName,
      type: AccountRecordAdapter.toAccountRecordType(externalAccount.type),
      subtype: AccountRecordAdapter.toAccountRecordSubtype(
        externalAccount.subtype
      ),
      verificationStatus:
        AccountRecordAdapter.toAccountRecordVerificationStatus(
          externalAccount.verificationStatus
        )
    };

    return createAccountQuery;
  }

  public static toUpdateAccountQuery(
    institutionId: string,
    accountId: string,
    externalAccount: ExternalAccount
  ) {
    const updateAccountQuery: UpdateAccountQuery = {
      ...AccountRecordAdapter.toCreateAccountQuery(
        institutionId,
        externalAccount
      ),
      id: accountId
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

  public static toAccountRecordSubtype(
    subtype: ExternalAccountSubtype | null
  ): AccountRecordSubtype | null {
    if (subtype == null) return null;

    switch (subtype) {
      case ExternalAccountSubtype._401a:
        return AccountRecordSubtype.Plan401a;
      case ExternalAccountSubtype._401k:
        return AccountRecordSubtype.Plan401k;
      case ExternalAccountSubtype._403B:
        return AccountRecordSubtype.Plan403B;
      case ExternalAccountSubtype._457b:
        return AccountRecordSubtype.Plan457b;
      case ExternalAccountSubtype._529:
        return AccountRecordSubtype.Plan529;
      case ExternalAccountSubtype.Brokerage:
        return AccountRecordSubtype.Brokerage;
      case ExternalAccountSubtype.CashIsa:
        return AccountRecordSubtype.CashIsa;
      case ExternalAccountSubtype.CryptoExchange:
        return AccountRecordSubtype.CryptoExchange;
      case ExternalAccountSubtype.EducationSavingsAccount:
        return AccountRecordSubtype.EducationSavingsAccount;
      case ExternalAccountSubtype.Ebt:
        return AccountRecordSubtype.Ebt;
      case ExternalAccountSubtype.FixedAnnuity:
        return AccountRecordSubtype.FixedAnnuity;
      case ExternalAccountSubtype.Gic:
        return AccountRecordSubtype.Gic;
      case ExternalAccountSubtype.HealthReimbursementArrangement:
        return AccountRecordSubtype.HealthReimbursementArrangement;
      case ExternalAccountSubtype.Hsa:
        return AccountRecordSubtype.Hsa;
      case ExternalAccountSubtype.Isa:
        return AccountRecordSubtype.Isa;
      case ExternalAccountSubtype.Ira:
        return AccountRecordSubtype.Ira;
      case ExternalAccountSubtype.Lif:
        return AccountRecordSubtype.Lif;
      case ExternalAccountSubtype.LifeInsurance:
        return AccountRecordSubtype.LifeInsurance;
      case ExternalAccountSubtype.Lira:
        return AccountRecordSubtype.Lira;
      case ExternalAccountSubtype.Lrif:
        return AccountRecordSubtype.Lrif;
      case ExternalAccountSubtype.Lrsp:
        return AccountRecordSubtype.Lrsp;
      case ExternalAccountSubtype.NonCustodialWallet:
        return AccountRecordSubtype.NonCustodialWallet;
      case ExternalAccountSubtype.NonTaxableBrokerageAccount:
        return AccountRecordSubtype.NonTaxableBrokerageAccount;
      case ExternalAccountSubtype.Other:
        return AccountRecordSubtype.Other;
      case ExternalAccountSubtype.OtherInsurance:
        return AccountRecordSubtype.OtherInsurance;
      case ExternalAccountSubtype.OtherAnnuity:
        return AccountRecordSubtype.OtherAnnuity;
      case ExternalAccountSubtype.Prif:
        return AccountRecordSubtype.Prif;
      case ExternalAccountSubtype.Rdsp:
        return AccountRecordSubtype.Rdsp;
      case ExternalAccountSubtype.Resp:
        return AccountRecordSubtype.Resp;
      case ExternalAccountSubtype.Rlif:
        return AccountRecordSubtype.Rlif;
      case ExternalAccountSubtype.Rrif:
        return AccountRecordSubtype.Rrif;
      case ExternalAccountSubtype.Pension:
        return AccountRecordSubtype.Pension;
      case ExternalAccountSubtype.ProfitSharingPlan:
        return AccountRecordSubtype.ProfitSharingPlan;
      case ExternalAccountSubtype.Retirement:
        return AccountRecordSubtype.Retirement;
      case ExternalAccountSubtype.Roth:
        return AccountRecordSubtype.Roth;
      case ExternalAccountSubtype.Roth401k:
        return AccountRecordSubtype.Roth401k;
      case ExternalAccountSubtype.Rrsp:
        return AccountRecordSubtype.Rrsp;
      case ExternalAccountSubtype.SepIra:
        return AccountRecordSubtype.SepIra;
      case ExternalAccountSubtype.SimpleIra:
        return AccountRecordSubtype.SimpleIra;
      case ExternalAccountSubtype.Sipp:
        return AccountRecordSubtype.Sipp;
      case ExternalAccountSubtype.StockPlan:
        return AccountRecordSubtype.StockPlan;
      case ExternalAccountSubtype.ThriftSavingsPlan:
        return AccountRecordSubtype.ThriftSavingsPlan;
      case ExternalAccountSubtype.Tfsa:
        return AccountRecordSubtype.Tfsa;
      case ExternalAccountSubtype.Trust:
        return AccountRecordSubtype.Trust;
      case ExternalAccountSubtype.Ugma:
        return AccountRecordSubtype.Ugma;
      case ExternalAccountSubtype.Utma:
        return AccountRecordSubtype.Utma;
      case ExternalAccountSubtype.VariableAnnuity:
        return AccountRecordSubtype.VariableAnnuity;
      case ExternalAccountSubtype.CreditCard:
        return AccountRecordSubtype.CreditCard;
      case ExternalAccountSubtype.Paypal:
        return AccountRecordSubtype.Paypal;
      case ExternalAccountSubtype.Cd:
        return AccountRecordSubtype.Cd;
      case ExternalAccountSubtype.Checking:
        return AccountRecordSubtype.Checking;
      case ExternalAccountSubtype.Savings:
        return AccountRecordSubtype.Savings;
      case ExternalAccountSubtype.MoneyMarket:
        return AccountRecordSubtype.MoneyMarket;
      case ExternalAccountSubtype.Prepaid:
        return AccountRecordSubtype.Prepaid;
      case ExternalAccountSubtype.Auto:
        return AccountRecordSubtype.Auto;
      case ExternalAccountSubtype.Business:
        return AccountRecordSubtype.Business;
      case ExternalAccountSubtype.Commercial:
        return AccountRecordSubtype.Commercial;
      case ExternalAccountSubtype.Construction:
        return AccountRecordSubtype.Construction;
      case ExternalAccountSubtype.Consumer:
        return AccountRecordSubtype.Consumer;
      case ExternalAccountSubtype.HomeEquity:
        return AccountRecordSubtype.HomeEquity;
      case ExternalAccountSubtype.Loan:
        return AccountRecordSubtype.Loan;
      case ExternalAccountSubtype.Mortgage:
        return AccountRecordSubtype.Mortgage;
      case ExternalAccountSubtype.Overdraft:
        return AccountRecordSubtype.Overdraft;
      case ExternalAccountSubtype.LineOfCredit:
        return AccountRecordSubtype.LineOfCredit;
      case ExternalAccountSubtype.Student:
        return AccountRecordSubtype.Student;
      case ExternalAccountSubtype.CashManagement:
        return AccountRecordSubtype.CashManagement;
      case ExternalAccountSubtype.Keogh:
        return AccountRecordSubtype.Keogh;
      case ExternalAccountSubtype.MutualFund:
        return AccountRecordSubtype.MutualFund;
      case ExternalAccountSubtype.Recurring:
        return AccountRecordSubtype.Recurring;
      case ExternalAccountSubtype.Rewards:
        return AccountRecordSubtype.Rewards;
      case ExternalAccountSubtype.SafeDeposit:
        return AccountRecordSubtype.SafeDeposit;
      case ExternalAccountSubtype.Sarsep:
        return AccountRecordSubtype.Sarsep;
      case ExternalAccountSubtype.Payroll:
        return AccountRecordSubtype.Payroll;
      case ExternalAccountSubtype.Null:
        return AccountRecordSubtype.Null;
      default:
        return null;
    }
  }

  public static toAccountRecordVerificationStatus(
    status: ExternalAccountVerificationStatus | null
  ): AccountRecordVerificationStatus | null {
    if (status == null) return null;

    switch (status) {
      case ExternalAccountVerificationStatus.AutomaticallyVerified:
        return AccountRecordVerificationStatus.AutomaticallyVerified;
      case ExternalAccountVerificationStatus.PendingAutomaticVerification:
        return AccountRecordVerificationStatus.PendingAutomaticVerification;
      case ExternalAccountVerificationStatus.PendingManualVerification:
        return AccountRecordVerificationStatus.PendingManualVerification;
      case ExternalAccountVerificationStatus.ManuallyVerified:
        return AccountRecordVerificationStatus.ManuallyVerified;
      case ExternalAccountVerificationStatus.VerificationExpired:
        return AccountRecordVerificationStatus.VerificationExpired;
      case ExternalAccountVerificationStatus.VerificationFailed:
        return AccountRecordVerificationStatus.VerificationFailed;
      case ExternalAccountVerificationStatus.DatabaseMatched:
        return AccountRecordVerificationStatus.DatabaseMatched;
      default:
        return null;
    }
  }
}
