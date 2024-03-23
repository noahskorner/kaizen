import { ApiResponse } from '@kaizen/core';
import { ApiClient, handleAxiosRequest } from '@kaizen/core-client';
import { Wallet } from '@kaizen/wallet';
import { GetWalletByUserIdRequest } from '@kaizen/wallet/src/get-wallet/get-wallet-by-user-id.request';

export const WalletClient = {
  getByUserId: (
    request: GetWalletByUserIdRequest
  ): Promise<ApiResponse<Wallet>> => {
    return handleAxiosRequest(() => {
      return ApiClient.get<ApiResponse<Wallet>>(
        `/wallet/user/${request.userId}`
      );
    });
  }
};
