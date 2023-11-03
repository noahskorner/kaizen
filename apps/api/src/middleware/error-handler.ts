import { ApiError, ErrorKey } from '@kaizen/services';
import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const response: ApiError[] = [
    {
      key: ErrorKey.INTERNAL_SERVER_ERROR,
      message: JSON.stringify(err)
    }
  ];

  return res.status(500).json(response);
};
