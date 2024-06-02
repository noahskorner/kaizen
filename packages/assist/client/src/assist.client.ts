import { ApiResponse } from '@kaizen/core';
import { ApiClient, handleAxiosRequest } from '@kaizen/core-client';

export const AssistClient = {
  transcribe: async (request: Blob): Promise<ApiResponse<string>> => {
    return handleAxiosRequest(() => {
      return ApiClient.post<ApiResponse<string>>(
        '/assist/transcribe',
        request,
        {
          headers: {
            'Content-Type': 'audio/wav'
          }
        }
      );
    });
  }
};
