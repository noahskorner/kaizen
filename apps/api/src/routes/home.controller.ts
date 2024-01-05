import { Request, Response } from 'express';
import { catchAsync } from '../middleware/catch-async';
import { Controller } from './controller';

export class HomeController extends Controller {
  public find = catchAsync(async (req: Request, res: Response) => {
    return this.ok(res);
  });
}
