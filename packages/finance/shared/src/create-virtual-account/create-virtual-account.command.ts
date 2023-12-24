import { CreateVirtualAccountRequest } from './create-virtual-account.request';

export interface CreateVirtualAccountCommand
  extends CreateVirtualAccountRequest {
  userId: string;
}
