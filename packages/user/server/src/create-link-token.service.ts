import { CountryCode, LinkTokenCreateRequest, Products } from 'plaid';
import { plaidClient } from './plaid-client';
import { CreateLinkTokenCommand } from './create-link-token.command';
import { ApiResponse, Errors, Service } from '@kaizen/core';
import { UserRepository } from './user.repository';

export class CreateLinkTokenService extends Service {
  private readonly _userRepository: UserRepository;

  constructor() {
    super();
    this._userRepository = new UserRepository();
  }

  public async create({
    userId
  }: CreateLinkTokenCommand): Promise<ApiResponse<string>> {
    try {
      const user = await this._userRepository.get(userId);
      if (user == null) {
        return this.failure(Errors.CREATE_LINK_TOKEN_USER_NOT_FOUND);
      }

      if (user.plaidToken != null) {
        return this.failure(Errors.CREATE_LINK_TOKEN_USER_ALREADY_HAS_TOKEN);
      }

      const createLinkTokenRequest: LinkTokenCreateRequest = {
        user: {
          client_user_id: userId
        },
        client_name: 'kaizen',
        language: 'en',
        country_codes: [CountryCode.Us],
        products: [Products.Transactions]
      };
      const createTokenResponse = await plaidClient.linkTokenCreate(
        createLinkTokenRequest
      );

      if (createTokenResponse.status !== 200) {
        return this.failure(Errors.INTERNAL_SERVER_ERROR);
      }
      const linkToken = createTokenResponse.data.link_token;

      await this._userRepository.update({
        userId,
        plaidToken: linkToken
      });
      return this.success(linkToken);
    } catch (error) {
      console.log(error);
      return this.failure(Errors.INTERNAL_SERVER_ERROR);
    }
  }
}