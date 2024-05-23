import { ApiClient, handleAxiosRequest } from '@kaizen/core-client';
import { ApiResponse } from '@kaizen/core';
import {
  Category,
  FindCategoriesResponse,
  UpdateCategoryRequest
} from '@kaizen/finance';

// TODO: Move these into the TransactionClient
export const TransactionCategoryClient = {
  update: (
    transactionId: string,
    categoryId: string,
    request: UpdateCategoryRequest
  ): Promise<ApiResponse<Category>> => {
    return handleAxiosRequest(() => {
      return ApiClient.put<ApiResponse<Category>>(
        `/transaction/${transactionId}/category/${categoryId}`,
        request
      );
    });
  },
  find: (): Promise<ApiResponse<FindCategoriesResponse>> => {
    return handleAxiosRequest(() => {
      return ApiClient.get<ApiResponse<FindCategoriesResponse>>(
        '/transaction/category'
      );
    });
  }
};
