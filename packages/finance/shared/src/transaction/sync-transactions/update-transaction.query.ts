import { TransactionCodeRecord } from '../transaction-code-record';
import { TransactionPaymentChannelRecord } from '../transaction-payment-channel-record';
import { UpdateCategoryQuery } from './update-category.query';
import { UpdateLocationQuery } from './update-location.query';

export interface UpdateTransactionQuery {
  id: string;
  amount: number;
  isoCurrencyCode: string | null;
  unofficialCurrencyCode: string | null;
  checkNumber: string | null;
  date: string;
  location: UpdateLocationQuery;
  category: UpdateCategoryQuery;
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
  paymentChannel: TransactionPaymentChannelRecord;
  code: TransactionCodeRecord | null;
  categoryIconUrl: string | null;
  merchantEntityId: string | null;
}
