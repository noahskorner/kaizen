import { ApiFailureResponse, ApiSuccessResponse } from '@kaizen/services';
import { Response } from 'express';

export abstract class Controller {
  public created = <T>(res: Response, response: ApiSuccessResponse<T>) => {
    return res.status(201).json(response.data);
  };

  public badRequest(res: Response, response: ApiFailureResponse) {
    return res.status(400).json(response.errors);
  }

  public unauthorized(res: Response, response: ApiFailureResponse) {
    return res.status(401).json(response.errors);
  }

  public ok = <T>(res: Response, response: ApiSuccessResponse<T>) => {
    return res.status(200).json(response.data);
  };
}
