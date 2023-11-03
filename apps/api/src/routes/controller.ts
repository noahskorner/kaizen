import { ApiFailureResponse, ApiSuccessResponse } from '@kaizen/services';
import { Response } from 'express';

export abstract class Controller {
  public created = <T>(res: Response, response: ApiSuccessResponse<T>) => {
    return res.status(201).json(response.data);
  };

  public badRequest(res: Response, response: ApiFailureResponse) {
    return res.status(400).json(response.errors);
  }
}
