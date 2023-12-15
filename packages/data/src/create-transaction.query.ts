export interface CreateTransactionQuery {
  externalId: string;
  externalAccountId: string;
  amount: number;
  date: Date | null;
  name: string;
  merchantName: string | null;
  pending: boolean;
  logoUrl: string | null;
}
