import { Category } from './category';
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
  location: Location;
  category: Category | null;
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
  categoryIconUrl: string | null;
  merchantEntityId: string | null;
}
