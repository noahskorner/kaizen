import { ApiFailureResponse, ApiSuccessResponse } from '@kaizen/core';
import { Response } from 'express';

export abstract class Controller {
  public protected = <T>(res: Response, response: ApiSuccessResponse<T>) => {
    return res.status(201).json(response);
  };

  public badRequest(res: Response, response: ApiFailureResponse) {
    return res.status(400).json(response);
  }

  public unauthorized(res: Response, response?: ApiFailureResponse) {
    if (response == null) return res.sendStatus(401);

    return res.status(401).json(response);
  }

  public ok<T>(res: Response, response?: ApiSuccessResponse<T>) {
    if (response == null) return res.sendStatus(200);

    return res.status(200).json(response);
  }

  public internalServerError(res: Response, response?: ApiFailureResponse) {
    if (response == null) return res.sendStatus(500);

    return res.status(500).json(response);
  }
}
