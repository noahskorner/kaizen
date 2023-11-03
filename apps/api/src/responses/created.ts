import { ApiSuccessResponse } from '@kaizen/services';
import { Response } from 'express';

export const created = <T>(res: Response, response: ApiSuccessResponse<T>) => {
  return res.status(201).json(response.data);
};
