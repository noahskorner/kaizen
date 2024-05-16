import { ApiClient, handleAxiosRequest } from '@kaizen/core-client';
import { ApiResponse } from '@kaizen/core';
import { FindCategoriesResponse } from '@kaizen/finance';

export const CategoryClient = {
  find: (): Promise<ApiResponse<FindCategoriesResponse>> => {
    return handleAxiosRequest(() => {
      return ApiClient.get<ApiResponse<FindCategoriesResponse>>(
        '/transaction/category'
      );
    });
  }
};
