export interface FindTransactionsQuery {
  userId: string;
  page: number;
  pageSize: number;
  startDate?: string;
  endDate?: string;
}
