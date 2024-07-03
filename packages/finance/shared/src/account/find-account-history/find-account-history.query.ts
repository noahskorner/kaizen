export interface FindAccountHistoryQuery {
  userId: string;
  page: number;
  pageSize: number;
  startDate: string;
  endDate: string;
}
