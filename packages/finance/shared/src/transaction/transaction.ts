import { Category } from '../category/category';
import { Location } from './location';
import { TransactionCode } from './transaction-code';
import { TransactionPaymentChannel } from './transaction-payment-channel';

export interface Transaction {
  id: string;
  userId: string;
  institutionId: string;
  accountId: string;
  externalId: string;
  externalAccountId: string;
  categoryId: string | null;
  category: Category | null;
  location: Location;
  amount: number;
  isoCurrencyCode: string | null;
  unofficialCurrencyCode: string | null;
  checkNumber: string | null;
  date: string;
  name: string | null;
  merchantName: string | null;
  originalDescription: string | null;
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
}
