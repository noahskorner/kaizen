import { Location } from './location';
import { TransactionCategory } from './transaction-category';
import { TransactionCode } from './transaction-code';
import { TransactionPaymentChannel } from './transaction-payment-channel';

export interface Transaction {
  id: string;
  userId: string;
  institutionId: string;
  accountId: string;
  externalId: string;
  externalAccountId: string;
  category: TransactionCategory | null;
  location: Location;
  isoCurrencyCode: string | null;
  unofficialCurrencyCode: string | null;
  checkNumber: string | null;
  date: string;
  pending: boolean;
  pendingTransactionId: string | null;
  accountOwner: string | null;
  logoUrl: string | null;
  website: string | null;
  authorizedDate: string | null;
  authorizedDatetime: string | null;
  datetime: string | null;
  paymentChannel: TransactionPaymentChannel;
  code: TransactionCode | null;
  merchantEntityId: string | null;
  originalCategory: string | null;
  originalDetailed: string | null;
  originalConfidenceLevel: string | null;
  originalIconUrl: string | null;
  originalAmount: number;
  originalName: string | null;
  originalDescription: string | null;
  originalMerchantName: string | null;
  name: string | null;
  amount: number;
  description: string | null;
  merchantName: string | null;
}
