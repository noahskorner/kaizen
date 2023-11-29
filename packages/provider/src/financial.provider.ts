import { CountryCode, LinkTokenCreateRequest, PlaidApi, Products } from 'plaid';
import { ApiResponse, Errors, Service } from '@kaizen/core';

export class FinancialProvider extends Service {
  constructor(private readonly _plaidClient: PlaidApi) {
    super();
  }

  public async createLinkToken(userId: string): Promise<ApiResponse<string>> {
    try {
      const createLinkTokenRequest: LinkTokenCreateRequest = {
        user: {
          client_user_id: userId
        },
        client_name: 'Kaizen',
        language: 'en',
        country_codes: [CountryCode.Us],
        products: [Products.Transactions]
      };
      const createTokenResponse = await this._plaidClient.linkTokenCreate(
        createLinkTokenRequest
      );

      if (createTokenResponse.status !== 200) {
        return this.failure(Errors.INTERNAL_SERVER_ERROR);
      }
      const linkToken = createTokenResponse.data.link_token;

      return this.success(linkToken);
    } catch (error) {
      console.log(error);
      return this.failure(Errors.INTERNAL_SERVER_ERROR);
    }
  }

  public async exchangePublicToken(): Promise<string> {
    
  }
}
