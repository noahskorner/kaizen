import { UpdateTransactionRequest } from './update-transaction.request';

export interface UpdateTransactionCommand extends UpdateTransactionRequest {
  userId: string;
}
