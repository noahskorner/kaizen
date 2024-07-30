import { TransactionCodeRecord } from '../transaction-code-record';
import { TransactionPaymentChannelRecord } from '../transaction-payment-channel-record';
import { CreateLocationQuery } from './create-location.query';

export interface CreateTransactionQuery {
  userId: string;
  institutionId: string;
  accountId: string;
  externalId: string;
  externalAccountId: string;
  location: CreateLocationQuery;
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
  paymentChannel: TransactionPaymentChannelRecord;
  code: TransactionCodeRecord | null;
  merchantEntityId: string | null;
  originalCategory: string | null;
  originalDetailed: string | null;
  originalConfidenceLevel: string | null;
  originalIconUrl: string | null;
  originalAmount: number;
  originalMerchantName: string | null;
  originalDescription: string | null;
  originalName: string | null;
  amount: number;
  merchantName: string | null;
  description: string | null;
  name: string | null;
}
