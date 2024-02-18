import { ExternalCategory } from './external-category';
import { ExternalLocation } from './external-location';
import { ExternalTransactionCode } from './external-transaction-code';
import { ExternalTransactionPaymentChannel } from './external-transaction-payment-channel';

export interface ExternalTransaction {
  externalId: string;
  externalAccountId: string;
  amount: number;
  isoCurrencyCode: string | null;
  unofficialCurrencyCode: string | null;
  checkNumber: string | null;
  date: string;
  location: ExternalLocation;
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
  paymentChannel: ExternalTransactionPaymentChannel;
  category: ExternalCategory | null;
  code: ExternalTransactionCode | null;
  categoryIconUrl: string | null;
  merchantEntityId: string | null;
}
