import { VirtualAccountRecordFrequency } from '@prisma/client';

export interface CreateVirtualAccountQuery {
  userId: string;
  name: string;
  balance: number;
  amount: number;
  currency: string;
  frequency: VirtualAccountRecordFrequency;
}
