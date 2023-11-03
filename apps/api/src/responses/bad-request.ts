import { ApiFailureResponse } from '@kaizen/services';
import { Response } from 'express';

export const badRequest = (res: Response, response: ApiFailureResponse) => {
  return res.status(400).json(response.errors);
};
