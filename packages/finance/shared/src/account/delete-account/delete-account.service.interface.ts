import { ServiceResponse } from '@kaizen/core';
import { DeleteAccountCommand } from './delete-account.command';

export interface IDeleteAccountService {
  delete(command: DeleteAccountCommand): Promise<ServiceResponse<true>>;
}
