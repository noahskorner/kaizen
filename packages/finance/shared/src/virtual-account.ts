import { VirtualAccountFrequency } from './virtual-account-frequency';

export interface VirtualAccount {
  id: string;
  createdAt: string;
  name: string;
  balance: number;
  amount: number;
  frequency: VirtualAccountFrequency;
  currency: string;
}
