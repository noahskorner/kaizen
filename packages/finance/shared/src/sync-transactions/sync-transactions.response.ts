import { Institution } from '../institution';
import { Transaction } from '../transaction';

export interface SyncTransactionsResponse {
  institution: Institution;
  created: Transaction[];
  updated: Transaction[];
  deleted: Transaction[];
}
