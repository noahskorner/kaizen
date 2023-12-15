export interface ExternalTransaction {
  id: string;
  accountId: string;
  amount: number;
  date: Date | null;
  name: string;
  merchantName: string | null;
  pending: boolean;
  logoUrl: string | null;
}
