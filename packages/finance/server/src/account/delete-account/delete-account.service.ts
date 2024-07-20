import {
  DeleteAccountNotFoundError,
  ErrorCode,
  ServiceResponse
} from '@kaizen/core';
import { Service } from '@kaizen/core-server';
import {
  DeleteAccountCommand,
  DeleteAccountQuery,
  GetAccountByIdQuery,
  IDeleteAccountRepository,
  IDeleteAccountService,
  IGetAccountRepository
} from '@kaizen/finance';

export class DeleteAccountService
  extends Service
  implements IDeleteAccountService
{
  constructor(
    private readonly getAccountRepository: IGetAccountRepository,
    private readonly deleteAccountRepository: IDeleteAccountRepository
  ) {
    super();
  }

  public async delete(
    command: DeleteAccountCommand
  ): Promise<ServiceResponse<true>> {
    const account = await this.getAccountRepository.getById(
      command satisfies GetAccountByIdQuery
    );

    if (account == null) {
      return this.failure({
        code: ErrorCode.DELETE_ACCOUNT_NOT_FOUND,
        params: command
      } satisfies DeleteAccountNotFoundError);
    }

    await this.deleteAccountRepository.delete(
      command satisfies DeleteAccountQuery
    );
    return this.success(true);
  }
}
