import { CreateLinkTokenCommand } from '@kaizen/user/src/create-link-token/create-link-token.command';
import { ApiResponse, Errors } from '@kaizen/core';
import { IGetUserRepository, LinkToken } from '@kaizen/user';
import { FinancialProvider, Service } from '@kaizen/core-server';
import { ICreateLinkTokenService } from '@kaizen/user/src/create-link-token/create-link-token.service.interface';

export class CreateLinkTokenService
  extends Service
  implements ICreateLinkTokenService
{
  constructor(
    private readonly _getUserRepository: IGetUserRepository,
    private readonly _financialProvider: FinancialProvider
  ) {
    super();
  }

  public async create({
    userId
  }: CreateLinkTokenCommand): Promise<ApiResponse<LinkToken>> {
    try {
      const user = await this._getUserRepository.get({ userId });
      if (user == null) {
        return this.failure(Errors.CREATE_LINK_TOKEN_USER_NOT_FOUND);
      }

      const response =
        await this._financialProvider.createExternalLinkToken(userId);
      if (response.type === 'FAILURE') {
        return this.failures(response.errors);
      }

      return this.success({ token: response.data });
    } catch (error) {
      console.log(error);
      return this.failure(Errors.INTERNAL_SERVER_ERROR);
    }
  }
}
