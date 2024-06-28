export interface FindAccountHistoryRequest {
  /** 0 based */
  page: number;
  pageSize: number;
  startDate: string;
  endDate: string;
}
