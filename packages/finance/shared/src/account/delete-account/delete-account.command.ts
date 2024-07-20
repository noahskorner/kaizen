import { DeleteAccountRequest } from './delete-account.request';

export interface DeleteAccountCommand extends DeleteAccountRequest {
  userId: string;
}
