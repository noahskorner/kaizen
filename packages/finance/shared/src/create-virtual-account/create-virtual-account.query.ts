import { VirtualAccountRecordFrequency } from '../virtual-account-record-frequency';

export interface CreateVirtualAccountQuery {
  userId: string;
  name: string;
  balance: number;
  amount: number;
  currency: string;
  frequency: VirtualAccountRecordFrequency;
}
