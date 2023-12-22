import { CreateVirtualAccountRequest } from '@kaizen/finance';

export interface CreateVirtualAccountCommand
  extends CreateVirtualAccountRequest {
  userId: string;
}
