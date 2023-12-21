export interface Transaction {
  id: string;
  externalId: string;
  accountId: string;
  externalAccountId: string;
  amount: number;
  currency: string | null;
  date: Date | null;
  name: string;
  merchantName: string | null;
  pending: boolean;
  logoUrl: string | null;
}
