import { Account } from './account';
import { AccountRecord } from './account-record';
import { AccountRecordSubtype } from './account-record-subtype';
import { AccountRecordType } from './account-record-type';
import { AccountRecordVerificationStatus } from './account-record-verification-status';
import { AccountSubtype } from './account-subtype';
import { AccountType } from './account-type';
import { AccountVerificationStatus } from './account-verification-status';

export class AccountAdapter {
  public static toAccount(accountRecord: AccountRecord): Account {
    const account: Account = {
      id: accountRecord.id,
      createdAt: accountRecord.createdAt.toISOString(),
      institutionId: accountRecord.institutionId,
      externalId: accountRecord.externalId,
      available: accountRecord.available,
      current: accountRecord.current,
      limit: accountRecord.limit,
      isoCurrencyCode: accountRecord.isoCurrencyCode,
      unofficialCurrencyCode: accountRecord.unofficialCurrencyCode,
      externalUpdatedAt: accountRecord.externalUpdatedAt?.toISOString() ?? null,
      mask: accountRecord.mask,
      name: accountRecord.name,
      officialName: accountRecord.officialName,
      type: AccountAdapter.toAccountType(accountRecord.type),
      subtype: AccountAdapter.toAccountSubtype(accountRecord.subtype),
      verificationStatus: AccountAdapter.toAccountVerificationStatus(
        accountRecord.verificationStatus
      )
    };

    return account;
  }

  public static toAccountType(type: AccountRecordType): AccountType {
    switch (type) {
      case AccountRecordType.Investment:
        return AccountType.Investment;
      case AccountRecordType.Credit:
        return AccountType.Credit;
      case AccountRecordType.Depository:
        return AccountType.Depository;
      case AccountRecordType.Loan:
        return AccountType.Loan;
      case AccountRecordType.Brokerage:
        return AccountType.Brokerage;
      default:
      case AccountRecordType.Other:
        return AccountType.Other;
    }
  }

  public static toAccountSubtype(
    subtype: AccountRecordSubtype | null
  ): AccountSubtype | null {
    switch (subtype) {
      case AccountRecordSubtype.Plan401a:
        return AccountSubtype._401a;
      case AccountRecordSubtype.Plan401k:
        return AccountSubtype._401k;
      case AccountRecordSubtype.Plan403B:
        return AccountSubtype._403B;
      case AccountRecordSubtype.Plan457b:
        return AccountSubtype._457b;
      case AccountRecordSubtype.Plan529:
        return AccountSubtype._529;
      case AccountRecordSubtype.Brokerage:
        return AccountSubtype.Brokerage;
      case AccountRecordSubtype.CashIsa:
        return AccountSubtype.CashIsa;
      case AccountRecordSubtype.CryptoExchange:
        return AccountSubtype.CryptoExchange;
      case AccountRecordSubtype.EducationSavingsAccount:
        return AccountSubtype.EducationSavingsAccount;
      case AccountRecordSubtype.Ebt:
        return AccountSubtype.Ebt;
      case AccountRecordSubtype.FixedAnnuity:
        return AccountSubtype.FixedAnnuity;
      case AccountRecordSubtype.Gic:
        return AccountSubtype.Gic;
      case AccountRecordSubtype.HealthReimbursementArrangement:
        return AccountSubtype.HealthReimbursementArrangement;
      case AccountRecordSubtype.Hsa:
        return AccountSubtype.Hsa;
      case AccountRecordSubtype.Isa:
        return AccountSubtype.Isa;
      case AccountRecordSubtype.Ira:
        return AccountSubtype.Ira;
      case AccountRecordSubtype.Lif:
        return AccountSubtype.Lif;
      case AccountRecordSubtype.LifeInsurance:
        return AccountSubtype.LifeInsurance;
      case AccountRecordSubtype.Lira:
        return AccountSubtype.Lira;
      case AccountRecordSubtype.Lrif:
        return AccountSubtype.Lrif;
      case AccountRecordSubtype.Lrsp:
        return AccountSubtype.Lrsp;
      case AccountRecordSubtype.NonCustodialWallet:
        return AccountSubtype.NonCustodialWallet;
      case AccountRecordSubtype.NonTaxableBrokerageAccount:
        return AccountSubtype.NonTaxableBrokerageAccount;
      case AccountRecordSubtype.Other:
        return AccountSubtype.Other;
      case AccountRecordSubtype.OtherInsurance:
        return AccountSubtype.OtherInsurance;
      case AccountRecordSubtype.OtherAnnuity:
        return AccountSubtype.OtherAnnuity;
      case AccountRecordSubtype.Prif:
        return AccountSubtype.Prif;
      case AccountRecordSubtype.Rdsp:
        return AccountSubtype.Rdsp;
      case AccountRecordSubtype.Resp:
        return AccountSubtype.Resp;
      case AccountRecordSubtype.Rlif:
        return AccountSubtype.Rlif;
      case AccountRecordSubtype.Rrif:
        return AccountSubtype.Rrif;
      case AccountRecordSubtype.Pension:
        return AccountSubtype.Pension;
      case AccountRecordSubtype.ProfitSharingPlan:
        return AccountSubtype.ProfitSharingPlan;
      case AccountRecordSubtype.Retirement:
        return AccountSubtype.Retirement;
      case AccountRecordSubtype.Roth:
        return AccountSubtype.Roth;
      case AccountRecordSubtype.Roth401k:
        return AccountSubtype.Roth401k;
      case AccountRecordSubtype.Rrsp:
        return AccountSubtype.Rrsp;
      case AccountRecordSubtype.SepIra:
        return AccountSubtype.SepIra;
      case AccountRecordSubtype.SimpleIra:
        return AccountSubtype.SimpleIra;
      case AccountRecordSubtype.Sipp:
        return AccountSubtype.Sipp;
      case AccountRecordSubtype.StockPlan:
        return AccountSubtype.StockPlan;
      case AccountRecordSubtype.ThriftSavingsPlan:
        return AccountSubtype.ThriftSavingsPlan;
      case AccountRecordSubtype.Tfsa:
        return AccountSubtype.Tfsa;
      case AccountRecordSubtype.Trust:
        return AccountSubtype.Trust;
      case AccountRecordSubtype.Ugma:
        return AccountSubtype.Ugma;
      case AccountRecordSubtype.Utma:
        return AccountSubtype.Utma;
      case AccountRecordSubtype.VariableAnnuity:
        return AccountSubtype.VariableAnnuity;
      case AccountRecordSubtype.CreditCard:
        return AccountSubtype.CreditCard;
      case AccountRecordSubtype.Paypal:
        return AccountSubtype.Paypal;
      case AccountRecordSubtype.Cd:
        return AccountSubtype.Cd;
      case AccountRecordSubtype.Checking:
        return AccountSubtype.Checking;
      case AccountRecordSubtype.Savings:
        return AccountSubtype.Savings;
      case AccountRecordSubtype.MoneyMarket:
        return AccountSubtype.MoneyMarket;
      case AccountRecordSubtype.Prepaid:
        return AccountSubtype.Prepaid;
      case AccountRecordSubtype.Auto:
        return AccountSubtype.Auto;
      case AccountRecordSubtype.Business:
        return AccountSubtype.Business;
      case AccountRecordSubtype.Commercial:
        return AccountSubtype.Commercial;
      case AccountRecordSubtype.Construction:
        return AccountSubtype.Construction;
      case AccountRecordSubtype.Consumer:
        return AccountSubtype.Consumer;
      case AccountRecordSubtype.HomeEquity:
        return AccountSubtype.HomeEquity;
      case AccountRecordSubtype.Loan:
        return AccountSubtype.Loan;
      case AccountRecordSubtype.Mortgage:
        return AccountSubtype.Mortgage;
      case AccountRecordSubtype.Overdraft:
        return AccountSubtype.Overdraft;
      case AccountRecordSubtype.LineOfCredit:
        return AccountSubtype.LineOfCredit;
      case AccountRecordSubtype.Student:
        return AccountSubtype.Student;
      case AccountRecordSubtype.CashManagement:
        return AccountSubtype.CashManagement;
      case AccountRecordSubtype.Keogh:
        return AccountSubtype.Keogh;
      case AccountRecordSubtype.MutualFund:
        return AccountSubtype.MutualFund;
      case AccountRecordSubtype.Recurring:
        return AccountSubtype.Recurring;
      case AccountRecordSubtype.Rewards:
        return AccountSubtype.Rewards;
      case AccountRecordSubtype.SafeDeposit:
        return AccountSubtype.SafeDeposit;
      case AccountRecordSubtype.Sarsep:
        return AccountSubtype.Sarsep;
      case AccountRecordSubtype.Payroll:
        return AccountSubtype.Payroll;
      case AccountRecordSubtype.Null:
        return AccountSubtype.Null;
      default:
        return null;
    }
  }

  public static toAccountVerificationStatus(
    status: AccountRecordVerificationStatus | null
  ): AccountVerificationStatus | null {
    if (status == null) return null;

    switch (status) {
      case AccountRecordVerificationStatus.AutomaticallyVerified:
        return AccountVerificationStatus.AutomaticallyVerified;
      case AccountRecordVerificationStatus.PendingAutomaticVerification:
        return AccountVerificationStatus.PendingAutomaticVerification;
      case AccountRecordVerificationStatus.PendingManualVerification:
        return AccountVerificationStatus.PendingManualVerification;
      case AccountRecordVerificationStatus.ManuallyVerified:
        return AccountVerificationStatus.ManuallyVerified;
      case AccountRecordVerificationStatus.VerificationExpired:
        return AccountVerificationStatus.VerificationExpired;
      case AccountRecordVerificationStatus.VerificationFailed:
        return AccountVerificationStatus.VerificationFailed;
      case AccountRecordVerificationStatus.DatabaseMatched:
        return AccountVerificationStatus.DatabaseMatched;
      default:
        return null;
    }
  }
}
