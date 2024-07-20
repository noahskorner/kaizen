import { DeleteAccountQuery } from './delete-account.query';

export interface IDeleteAccountRepository {
  delete(request: DeleteAccountQuery): Promise<boolean>;
}
