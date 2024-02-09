import { ApiFailureResponse, ErrorCode } from '@kaizen/core';
import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const response: ApiFailureResponse = {
    type: 'FAILURE',
    errors: [
      {
        code: ErrorCode.INTERNAL_SERVER_ERROR,
        // TODO: LOCALIZATION
        message: ErrorCode.INTERNAL_SERVER_ERROR
      }
    ]
  };

  return res.status(500).json(response);
};
