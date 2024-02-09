import { ErrorCode, ServiceResponse } from '@kaizen/core';
import {
  IGetUserRepository,
  LinkToken,
  ICreateLinkTokenService,
  CreateLinkTokenCommand
} from '@kaizen/user';
import { Service } from '@kaizen/core-server';
import { IFinancialProvider } from '@kaizen/finance';

export class CreateLinkTokenService
  extends Service
  implements ICreateLinkTokenService
{
  constructor(
    private readonly _getUserRepository: IGetUserRepository,
    private readonly _financialProvider: IFinancialProvider
  ) {
    super();
  }

  public async create({
    userId
  }: CreateLinkTokenCommand): Promise<ServiceResponse<LinkToken>> {
    const user = await this._getUserRepository.get({ userId });
    if (user == null) {
      return this.failure({
        code: ErrorCode.CREATE_LINK_TOKEN_USER_NOT_FOUND,
        params: { userId }
      });
    }

    const response =
      await this._financialProvider.createExternalLinkToken(userId);
    if (response.type === 'FAILURE') {
      return response;
    }

    return this.success({ token: response.data });
  }
}
