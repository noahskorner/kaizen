import { ApiClient, handleAxiosRequest } from '@kaizen/core-client';
import { ApiResponse } from '@kaizen/core';
import { Category, CreateCategoryRequest } from '@kaizen/finance';

export const CategoryClient = {
  create: (request: CreateCategoryRequest): Promise<ApiResponse<Category>> => {
    return handleAxiosRequest(() => {
      return ApiClient.post<ApiResponse<Category>>(`/category`, request);
    });
  }
};
