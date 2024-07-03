import { FindAccountHistoryRequest } from './find-account-history.request';

export interface FindAccountHistoryCommand extends FindAccountHistoryRequest {
  userId: string;
}
