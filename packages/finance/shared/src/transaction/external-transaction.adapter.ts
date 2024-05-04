import {
  Transaction,
  RemovedTransaction,
  Location,
  TransactionPaymentChannelEnum,
  PersonalFinanceCategory,
  TransactionCode
} from 'plaid';
import { ExternalTransaction } from './external-transaction';
import { ExternalCategory } from './external-category';
import { ExternalLocation } from './external-location';
import { ExternalTransactionCode } from './external-transaction-code';
import { ExternalTransactionPaymentChannel } from './external-transaction-payment-channel';

export class ExternalTransactionAdapter {
  public static toExternalTransaction(
    transaction: Transaction
  ): ExternalTransaction {
    const externalTransaction: ExternalTransaction = {
      location: ExternalTransactionAdapter.toExternalLocation(
        transaction.location
      ),
      category: ExternalTransactionAdapter.toExternalCategory(
        transaction.personal_finance_category,
        transaction.personal_finance_category_icon_url ?? null
      ),
      paymentChannel: ExternalTransactionAdapter.toExternalPaymentChannel(
        transaction.payment_channel
      ),
      code: ExternalTransactionAdapter.toExternalTransactionCode(
        transaction.transaction_code
      ),
      externalId: transaction.transaction_id,
      externalAccountId: transaction.account_id,
      amount: transaction.amount,
      isoCurrencyCode: transaction.iso_currency_code,
      unofficialCurrencyCode: transaction.unofficial_currency_code,
      checkNumber: transaction.check_number ?? null,
      date: new Date(transaction.date).toISOString(),
      name: transaction.name,
      merchantName: transaction.merchant_name ?? null,
      originalDescription: transaction.original_description ?? null,
      pending: transaction.pending,
      pendingTransactionId: transaction.pending_transaction_id,
      accountOwner: transaction.account_owner,
      logoUrl: transaction.logo_url ?? null,
      website: transaction.website ?? null,
      authorizedDate: transaction.authorized_date
        ? new Date(transaction.authorized_date).toISOString()
        : null,
      authorizedDatetime: transaction.authorized_datetime,
      datetime: transaction.datetime,
      categoryIconUrl: transaction.personal_finance_category_icon_url ?? null,
      merchantEntityId: transaction.merchant_entity_id ?? null
    };

    return externalTransaction;
  }

  public static toRemovedTransaction(
    removedTransactions: string[],
    removedTransaction: RemovedTransaction
  ): string[] {
    if (removedTransaction.transaction_id == null) return removedTransactions;

    return removedTransactions.concat(removedTransaction.transaction_id);
  }

  public static toExternalLocation(location: Location): ExternalLocation {
    const externalLocation: ExternalLocation = {
      address: location.address,
      city: location.city,
      region: location.region,
      postalCode: location.postal_code,
      country: location.country,
      lat: location.lat,
      lon: location.lon,
      storeNumber: location.store_number
    };

    return externalLocation;
  }

  public static toExternalPaymentChannel(
    paymentChannel: TransactionPaymentChannelEnum
  ): ExternalTransactionPaymentChannel {
    switch (paymentChannel) {
      case TransactionPaymentChannelEnum.Online:
        return ExternalTransactionPaymentChannel.Online;
      case TransactionPaymentChannelEnum.InStore:
        return ExternalTransactionPaymentChannel.InStore;
      case TransactionPaymentChannelEnum.Other:
        return ExternalTransactionPaymentChannel.Other;
      default:
        return ExternalTransactionPaymentChannel.Other;
    }
  }

  public static toExternalCategory(
    category: PersonalFinanceCategory | null | undefined,
    iconUrl: string | null
  ): ExternalCategory | null {
    if (category == null) return null;

    const externalCategory: ExternalCategory = {
      primary: category.primary,
      detailed: category.detailed,
      confidenceLevel: category.confidence_level ?? null,
      iconUrl: iconUrl
    };

    return externalCategory;
  }

  public static toExternalTransactionCode(
    code: TransactionCode | null
  ): ExternalTransactionCode | null {
    if (code == null) return null;
    switch (code) {
      case TransactionCode.Adjustment:
        return ExternalTransactionCode.Adjustment;
      case TransactionCode.Atm:
        return ExternalTransactionCode.Atm;
      case TransactionCode.BankCharge:
        return ExternalTransactionCode.BankCharge;
      case TransactionCode.BillPayment:
        return ExternalTransactionCode.BillPayment;
      case TransactionCode.Cash:
        return ExternalTransactionCode.Cash;
      case TransactionCode.Cashback:
        return ExternalTransactionCode.Cashback;
      case TransactionCode.Cheque:
        return ExternalTransactionCode.Cheque;
      case TransactionCode.DirectDebit:
        return ExternalTransactionCode.DirectDebit;
      case TransactionCode.Interest:
        return ExternalTransactionCode.Interest;
      case TransactionCode.Purchase:
        return ExternalTransactionCode.Purchase;
      case TransactionCode.StandingOrder:
        return ExternalTransactionCode.StandingOrder;
      case TransactionCode.Transfer:
        return ExternalTransactionCode.Transfer;
      case TransactionCode.Null:
        return ExternalTransactionCode.Null;
      default:
        return ExternalTransactionCode.Null;
    }
  }
}
