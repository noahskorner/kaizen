import { ExternalCategory } from './external-category';
import { ExternalLocation } from './external-location';
import { ExternalTransaction } from './external-transaction';
import { ExternalTransactionCode } from './external-transaction-code';
import { ExternalTransactionPaymentChannel } from './external-transaction-payment-channel';
import {
  CreateLocationQuery,
  CreateTransactionQuery,
  DeleteTransactionQuery,
  UpdateCategoryQuery,
  UpdateLocationQuery,
  UpdateTransactionQuery
} from './sync-transactions';
import { CreateCategoryQuery } from './sync-transactions/create-category.query';
import { TransactionCodeRecord } from './transaction-code-record';
import { TransactionPaymentChannelRecord } from './transaction-payment-channel-record';

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
      category: TransactionRecordAdapter.toCreateCategoryQuery(
        externalTransaction.category
      ),
      paymentChannel: TransactionRecordAdapter.toPaymentChannelRecord(
        externalTransaction.paymentChannel
      ),
      code: TransactionRecordAdapter.toTransactionCodeRecord(
        externalTransaction.code
      ),
      externalId: externalTransaction.externalId,
      externalAccountId: externalTransaction.externalAccountId,
      amount: externalTransaction.amount,
      isoCurrencyCode: externalTransaction.isoCurrencyCode,
      unofficialCurrencyCode: externalTransaction.unofficialCurrencyCode,
      checkNumber: externalTransaction.checkNumber,
      date: externalTransaction.date,
      name: externalTransaction.name,
      merchantName: externalTransaction.merchantName,
      originalDescription: externalTransaction.originalDescription,
      pending: externalTransaction.pending,
      pendingTransactionId: externalTransaction.pendingTransactionId,
      accountOwner: externalTransaction.accountOwner,
      logoUrl: externalTransaction.logoUrl,
      website: externalTransaction.website,
      authorizedDate: externalTransaction.authorizedDate,
      authorizedDatetime: externalTransaction.authorizedDatetime,
      datetime: externalTransaction.datetime,
      merchantEntityId: externalTransaction.merchantEntityId
    };

    return query;
  }

  public static toUpdateTransactionQuery({
    id,
    externalTransaction,
    locationId,
    categoryId
  }: _ToUpdateTransactionQueryCommand): UpdateTransactionQuery {
    const query: UpdateTransactionQuery = {
      id: id,
      location: TransactionRecordAdapter.toUpdateLocationQuery(
        locationId,
        externalTransaction.location
      ),
      category: TransactionRecordAdapter.toUpdateCategoryQuery(
        categoryId,
        externalTransaction.category
      ),
      paymentChannel: TransactionRecordAdapter.toPaymentChannelRecord(
        externalTransaction.paymentChannel
      ),
      code: TransactionRecordAdapter.toTransactionCodeRecord(
        externalTransaction.code
      ),
      amount: externalTransaction.amount,
      isoCurrencyCode: externalTransaction.isoCurrencyCode,
      unofficialCurrencyCode: externalTransaction.unofficialCurrencyCode,
      checkNumber: externalTransaction.checkNumber,
      date: externalTransaction.date,
      name: externalTransaction.name,
      merchantName: externalTransaction.merchantName,
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
      merchantEntityId: externalTransaction.merchantEntityId
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

  public static toCreateCategoryQuery(
    externalCategory: ExternalCategory | null
  ): CreateCategoryQuery {
    const query: CreateCategoryQuery = {
      originalCategory: externalCategory?.primary ?? null,
      detailed: externalCategory?.detailed ?? null,
      confidenceLevel: externalCategory?.confidenceLevel ?? null,
      iconUrl: externalCategory?.iconUrl ?? null
    };

    return query;
  }

  public static toUpdateCategoryQuery(
    categoryId: string,
    externalCategory: ExternalCategory | null
  ): UpdateCategoryQuery {
    const query: UpdateCategoryQuery = {
      id: categoryId,
      originalCategory: externalCategory?.primary ?? null,
      detailed: externalCategory?.detailed ?? null,
      confidenceLevel: externalCategory?.confidenceLevel ?? null,
      iconUrl: externalCategory?.iconUrl ?? null
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
  ): UpdateLocationQuery {
    const query: UpdateLocationQuery = {
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
  id: string;
  externalTransaction: ExternalTransaction;
  locationId: string;
  categoryId: string;
}
