import { TransactionCodeRecord } from '../transaction-code-record';
import { TransactionPaymentChannelRecord } from '../transaction-payment-channel-record';
import { SyncLocationQuery } from './sync-location.query';

export interface SyncTransactionQuery {
  id: string;
  isoCurrencyCode: string | null;
  unofficialCurrencyCode: string | null;
  checkNumber: string | null;
  date: string;
  location: SyncLocationQuery;
  pending: boolean;
  pendingTransactionId: string | null;
  accountOwner: string | null;
  logoUrl: string | null;
  website: string | null;
  authorizedDate: string | null;
  authorizedDatetime: string | null;
  datetime: string | null;
  paymentChannel: TransactionPaymentChannelRecord;
  code: TransactionCodeRecord | null;
  categoryIconUrl: string | null;
  merchantEntityId: string | null;
  originalCategory: string | null;
  originalDetailed: string | null;
  originalConfidenceLevel: string | null;
  originalIconUrl: string | null;
  originalAmount: number;
  originalMerchantName: string | null;
  originalName: string | null;
  originalDescription: string | null;
}
