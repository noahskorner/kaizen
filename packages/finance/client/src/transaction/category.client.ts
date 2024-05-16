import { ApiClient, handleAxiosRequest } from '@kaizen/core-client';
import { ApiResponse } from '@kaizen/core';
import {
  Category,
  FindCategoriesResponse,
  UpdateCategoryRequest
} from '@kaizen/finance';

export const CategoryClient = {
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
