export interface FindTransactionsRequest {
  /** 1-based page number */
  page: number;
  pageSize?: number;
  startDate?: string;
  endDate?: string;
}
