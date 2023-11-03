import { Request, Response, NextFunction } from 'express';

export const catchAsync = (
  handler: (
    req: Request,
    res: Response
  ) => Promise<Response<unknown, Record<string, unknown>>>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    handler(req, res).catch(next);
  };
};
