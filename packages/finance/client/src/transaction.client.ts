import { ApiClient, handleAxiosRequest } from '@kaizen/core-client';
import { FindTransactionsRequest, Transaction } from '@kaizen/finance';
import { ServiceResponse, Paginated, toSearchParams } from '@kaizen/core';

export const TransactionClient = {
  find: (
    request: FindTransactionsRequest
  ): Promise<ServiceResponse<Paginated<Transaction>>> => {
    return handleAxiosRequest(() => {
      return ApiClient.get<ServiceResponse<Paginated<Transaction>>>(
        `/transaction?${toSearchParams(request)}`
      );
    });
  }
};
