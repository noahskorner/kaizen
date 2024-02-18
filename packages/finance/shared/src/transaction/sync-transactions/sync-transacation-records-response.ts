import { InstitutionRecord } from '../../institution/institution-record';
import { TransactionRecord } from '../transaction-record';

export interface SyncTransactionRecordsResponse {
  updatedInstitutionRecord: InstitutionRecord;
  createdTransactionRecords: TransactionRecord[];
  updatedTransactionRecords: TransactionRecord[];
  deletedTransactionRecords: TransactionRecord[];
}
