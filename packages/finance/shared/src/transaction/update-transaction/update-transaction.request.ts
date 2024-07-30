export interface UpdateTransactionRequest {
  id: string;
  name?: string;
  amount?: number;
  merchantName?: string;
  description?: string;
}
