import { VirtualAccountFrequency } from './virtual-account-frequency';

export interface CreateVirtualAccountRequest {
  name: string;
  balance: number;
  amount: number;
  frequency: VirtualAccountFrequency;
}
