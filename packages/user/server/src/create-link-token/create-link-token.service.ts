import { CreateLinkTokenCommand } from './create-link-token.command';
import { ApiResponse, Errors } from '@kaizen/core';
import { UserRepository } from '@kaizen/core-server';
import { LinkToken } from '@kaizen/user';
import { FinancialProvider } from '@kaizen/core-server';
import { Service } from '@kaizen/core-server';

export class CreateLinkTokenService extends Service {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _financialProvider: FinancialProvider
  ) {
    super();
  }

  public async create({
    userId
  }: CreateLinkTokenCommand): Promise<ApiResponse<LinkToken>> {
    try {
      const user = await this._userRepository.get(userId);
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
