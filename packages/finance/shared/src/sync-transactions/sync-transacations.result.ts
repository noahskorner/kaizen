import { InstitutionRecord } from '../institution-record';
import { TransactionRecord } from '../transaction-record';

export interface SyncTransactionsResult {
  updatedInstitutionRecord: InstitutionRecord;
  createdTransactionRecords: TransactionRecord[];
  updatedTransactionRecords: TransactionRecord[];
  deletedTransactionRecords: TransactionRecord[];
}
