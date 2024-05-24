import { CategoryAdapter } from '../category';
import { Location } from './location';
import { LocationRecord } from './location-record';
import { Transaction } from './transaction';
import { TransactionCode } from './transaction-code';
import { TransactionCodeRecord } from './transaction-code-record';
import { TransactionPaymentChannel } from './transaction-payment-channel';
import { TransactionPaymentChannelRecord } from './transaction-payment-channel-record';
import { TransactionRecord } from './transaction-record';

export class TransactionAdapter {
  public static toTransaction(
    transactionRecord: TransactionRecord
  ): Transaction {
    const transaction: Transaction = {
      location: TransactionAdapter.toLocation(transactionRecord.location),
      paymentChannel: TransactionAdapter.toPaymentChannel(
        transactionRecord.paymentChannel
      ),
      code: TransactionAdapter.toTransactionCode(transactionRecord.code),
      id: transactionRecord.id,
      userId: transactionRecord.userId,
      institutionId: transactionRecord.institutionId,
      accountId: transactionRecord.accountId,
      externalId: transactionRecord.externalId,
      categoryId: transactionRecord.categoryId,
      category: transactionRecord.category
        ? CategoryAdapter.toCategory(transactionRecord.category)
        : null,
      externalAccountId: transactionRecord.externalAccountId,
      amount: transactionRecord.amount,
      isoCurrencyCode: transactionRecord.isoCurrencyCode,
      unofficialCurrencyCode: transactionRecord.unofficialCurrencyCode,
      checkNumber: transactionRecord.checkNumber,
      date: transactionRecord.date.toISOString(),
      name: transactionRecord.name,
      merchantName: transactionRecord.merchantName,
      originalDescription: transactionRecord.originalDescription,
      pending: transactionRecord.pending,
      pendingTransactionId: transactionRecord.pendingTransactionId,
      accountOwner: transactionRecord.accountOwner,
      logoUrl: transactionRecord.logoUrl,
      website: transactionRecord.website,
      authorizedDate: transactionRecord.authorizedDate
        ? transactionRecord.authorizedDate.toISOString()
        : null,
      authorizedDatetime: transactionRecord.authorizedDatetime
        ? transactionRecord.authorizedDatetime.toISOString()
        : null,
      datetime: transactionRecord.datetime
        ? transactionRecord.datetime.toISOString()
        : null,
      merchantEntityId: transactionRecord.merchantEntityId,
      originalCategory: transactionRecord.originalCategory,
      originalDetailed: transactionRecord.originalDetailed,
      originalConfidenceLevel: transactionRecord.originalConfidenceLevel,
      originalIconUrl: transactionRecord.originalIconUrl
    };
    return transaction;
  }

  private static toLocation(record: LocationRecord): Location {
    const location: Location = {
      id: record.id,
      address: record.address,
      city: record.city,
      region: record.region,
      postalCode: record.postalCode,
      country: record.country,
      lat: record.lat,
      lon: record.lon,
      storeNumber: record.storeNumber
    };

    return location;
  }

  private static toTransactionCode(
    code: TransactionCodeRecord | null
  ): TransactionCode | null {
    if (code == null) return null;
    switch (code) {
      case TransactionCodeRecord.Adjustment:
        return TransactionCode.Adjustment;
      case TransactionCodeRecord.Atm:
        return TransactionCode.Atm;
      case TransactionCodeRecord.BankCharge:
        return TransactionCode.BankCharge;
      case TransactionCodeRecord.BillPayment:
        return TransactionCode.BillPayment;
      case TransactionCodeRecord.Cash:
        return TransactionCode.Cash;
      case TransactionCodeRecord.Cashback:
        return TransactionCode.Cashback;
      case TransactionCodeRecord.Cheque:
        return TransactionCode.Cheque;
      case TransactionCodeRecord.DirectDebit:
        return TransactionCode.DirectDebit;
      case TransactionCodeRecord.Interest:
        return TransactionCode.Interest;
      case TransactionCodeRecord.Purchase:
        return TransactionCode.Purchase;
      case TransactionCodeRecord.StandingOrder:
        return TransactionCode.StandingOrder;
      case TransactionCodeRecord.Transfer:
        return TransactionCode.Transfer;
      case TransactionCodeRecord.Null:
        return TransactionCode.Null;
      default:
        return TransactionCode.Null;
    }
  }

  private static toPaymentChannel(
    paymentChannel: TransactionPaymentChannelRecord
  ): TransactionPaymentChannel {
    switch (paymentChannel) {
      case TransactionPaymentChannelRecord.Online:
        return TransactionPaymentChannel.Online;
      case TransactionPaymentChannelRecord.InStore:
        return TransactionPaymentChannel.InStore;
      case TransactionPaymentChannelRecord.Other:
        return TransactionPaymentChannel.Other;
      default:
        return TransactionPaymentChannel.Other;
    }
  }
}
