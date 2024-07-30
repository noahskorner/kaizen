import { ExternalLocation } from './external-location';
import { ExternalTransaction } from './external-transaction';
import { ExternalTransactionCode } from './external-transaction-code';
import { ExternalTransactionPaymentChannel } from './external-transaction-payment-channel';
import {
  CreateLocationQuery,
  CreateTransactionQuery,
  DeleteTransactionQuery,
  SyncLocationQuery,
  SyncTransactionQuery
} from './sync-transactions';
import { TransactionCodeRecord } from './transaction-code-record';
import { TransactionPaymentChannelRecord } from './transaction-payment-channel-record';
import { TransactionRecord } from './transaction-record';

export class TransactionRecordAdapter {
  public static toCreateTransactionQuery({
    userId,
    institutionId,
    accountId,
    externalTransaction
  }: _ToCreateTransactionQueryCommand): CreateTransactionQuery {
    const query: CreateTransactionQuery = {
      userId: userId,
      institutionId: institutionId,
      accountId: accountId,
      location: TransactionRecordAdapter.toCreateLocationQuery(
        externalTransaction.location
      ),
      paymentChannel: TransactionRecordAdapter.toPaymentChannelRecord(
        externalTransaction.paymentChannel
      ),
      code: TransactionRecordAdapter.toTransactionCodeRecord(
        externalTransaction.code
      ),
      externalId: externalTransaction.externalId,
      externalAccountId: externalTransaction.externalAccountId,
      originalAmount: externalTransaction.originalAmount,
      isoCurrencyCode: externalTransaction.isoCurrencyCode,
      unofficialCurrencyCode: externalTransaction.unofficialCurrencyCode,
      checkNumber: externalTransaction.checkNumber,
      date: externalTransaction.date,
      originalName: externalTransaction.originalName,
      originalMerchantName: externalTransaction.originalMerchantName,
      originalDescription: externalTransaction.originalDescription,
      pending: externalTransaction.pending,
      pendingTransactionId: externalTransaction.pendingTransactionId,
      accountOwner: externalTransaction.accountOwner,
      logoUrl: externalTransaction.logoUrl,
      website: externalTransaction.website,
      authorizedDate: externalTransaction.authorizedDate,
      authorizedDatetime: externalTransaction.authorizedDatetime,
      datetime: externalTransaction.datetime,
      merchantEntityId: externalTransaction.merchantEntityId,
      originalCategory: externalTransaction.category?.primary ?? null,
      originalDetailed: externalTransaction.category?.detailed ?? null,
      originalConfidenceLevel:
        externalTransaction.category?.confidenceLevel ?? null,
      originalIconUrl: externalTransaction.category?.iconUrl ?? null,
      // Initialize these fields as the fields from the finance provider
      name: externalTransaction.originalName ?? null,
      amount: externalTransaction.originalAmount,
      description: externalTransaction.originalDescription ?? null,
      merchantName: externalTransaction.originalMerchantName ?? null
    };

    return query;
  }

  public static toSyncTransactionQuery({
    transactionRecord,
    externalTransaction,
    locationId
  }: _ToUpdateTransactionQueryCommand): SyncTransactionQuery {
    // If the field is the same as the original field, then let's update it
    const name =
      transactionRecord.name === transactionRecord.originalName
        ? externalTransaction.originalName
        : undefined;
    const amount =
      transactionRecord.amount === transactionRecord.originalAmount
        ? externalTransaction.originalAmount
        : undefined;
    const merchantName =
      transactionRecord.merchantName === transactionRecord.originalMerchantName
        ? externalTransaction.originalMerchantName
        : undefined;
    const description =
      transactionRecord.description === transactionRecord.originalDescription
        ? externalTransaction.originalDescription
        : undefined;

    const query: SyncTransactionQuery = {
      id: transactionRecord.id,
      location: TransactionRecordAdapter.toUpdateLocationQuery(
        locationId,
        externalTransaction.location
      ),
      paymentChannel: TransactionRecordAdapter.toPaymentChannelRecord(
        externalTransaction.paymentChannel
      ),
      code: TransactionRecordAdapter.toTransactionCodeRecord(
        externalTransaction.code
      ),
      originalAmount: externalTransaction.originalAmount,
      isoCurrencyCode: externalTransaction.isoCurrencyCode,
      unofficialCurrencyCode: externalTransaction.unofficialCurrencyCode,
      checkNumber: externalTransaction.checkNumber,
      date: externalTransaction.date,
      originalName: externalTransaction.originalName,
      originalMerchantName: externalTransaction.originalMerchantName,
      originalDescription: externalTransaction.originalDescription,
      pending: externalTransaction.pending,
      pendingTransactionId: externalTransaction.pendingTransactionId,
      accountOwner: externalTransaction.accountOwner,
      logoUrl: externalTransaction.logoUrl,
      website: externalTransaction.website,
      authorizedDate: externalTransaction.authorizedDate,
      authorizedDatetime: externalTransaction.authorizedDatetime,
      datetime: externalTransaction.datetime,
      categoryIconUrl: externalTransaction.categoryIconUrl,
      merchantEntityId: externalTransaction.merchantEntityId,
      originalCategory: externalTransaction.category?.primary ?? null,
      originalDetailed: externalTransaction.category?.detailed ?? null,
      originalConfidenceLevel:
        externalTransaction.category?.confidenceLevel ?? null,
      originalIconUrl: externalTransaction.category?.iconUrl ?? null,
      name,
      amount,
      description,
      merchantName
    };

    return query;
  }

  public static toDeleteTransactionQuery(
    externalId: string
  ): DeleteTransactionQuery {
    const query: DeleteTransactionQuery = {
      externalId: externalId
    };

    return query;
  }

  public static toCreateLocationQuery(
    location: ExternalLocation
  ): CreateLocationQuery {
    const query: CreateLocationQuery = {
      address: location.address,
      city: location.city,
      region: location.region,
      postalCode: location.postalCode,
      country: location.country,
      lat: location.lat,
      lon: location.lon,
      storeNumber: location.storeNumber
    };

    return query;
  }

  public static toUpdateLocationQuery(
    locationId: string,
    location: ExternalLocation
  ): SyncLocationQuery {
    const query: SyncLocationQuery = {
      id: locationId,
      address: location.address,
      city: location.city,
      region: location.region,
      postalCode: location.postalCode,
      country: location.country,
      lat: location.lat,
      lon: location.lon,
      storeNumber: location.storeNumber
    };

    return query;
  }

  private static toTransactionCodeRecord(
    code: ExternalTransactionCode | null
  ): TransactionCodeRecord | null {
    if (code == null) return null;
    switch (code) {
      case ExternalTransactionCode.Adjustment:
        return TransactionCodeRecord.Adjustment;
      case ExternalTransactionCode.Atm:
        return TransactionCodeRecord.Atm;
      case ExternalTransactionCode.BankCharge:
        return TransactionCodeRecord.BankCharge;
      case ExternalTransactionCode.BillPayment:
        return TransactionCodeRecord.BillPayment;
      case ExternalTransactionCode.Cash:
        return TransactionCodeRecord.Cash;
      case ExternalTransactionCode.Cashback:
        return TransactionCodeRecord.Cashback;
      case ExternalTransactionCode.Cheque:
        return TransactionCodeRecord.Cheque;
      case ExternalTransactionCode.DirectDebit:
        return TransactionCodeRecord.DirectDebit;
      case ExternalTransactionCode.Interest:
        return TransactionCodeRecord.Interest;
      case ExternalTransactionCode.Purchase:
        return TransactionCodeRecord.Purchase;
      case ExternalTransactionCode.StandingOrder:
        return TransactionCodeRecord.StandingOrder;
      case ExternalTransactionCode.Transfer:
        return TransactionCodeRecord.Transfer;
      case ExternalTransactionCode.Null:
        return TransactionCodeRecord.Null;
      default:
        return TransactionCodeRecord.Null;
    }
  }

  private static toPaymentChannelRecord(
    paymentChannel: ExternalTransactionPaymentChannel
  ): TransactionPaymentChannelRecord {
    switch (paymentChannel) {
      case ExternalTransactionPaymentChannel.Online:
        return TransactionPaymentChannelRecord.Online;
      case ExternalTransactionPaymentChannel.InStore:
        return TransactionPaymentChannelRecord.InStore;
      case ExternalTransactionPaymentChannel.Other:
        return TransactionPaymentChannelRecord.Other;
      default:
        return TransactionPaymentChannelRecord.Other;
    }
  }
}

interface _ToCreateTransactionQueryCommand {
  userId: string;
  institutionId: string;
  accountId: string;
  externalTransaction: ExternalTransaction;
}

interface _ToUpdateTransactionQueryCommand {
  transactionRecord: TransactionRecord;
  externalTransaction: ExternalTransaction;
  locationId: string;
}
