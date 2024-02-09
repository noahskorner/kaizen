import {
  ServiceFailureResponse,
  ServiceResponseAdapter,
  ServiceSuccessResponse
} from '@kaizen/core';
import { Response } from 'express';

export abstract class Controller {
  protected created = <T>(
    res: Response,
    response: ServiceSuccessResponse<T>
  ) => {
    return res.status(201).json(ServiceResponseAdapter.toApiResponse(response));
  };

  protected badRequest(res: Response, response: ServiceFailureResponse) {
    return res.status(400).json(ServiceResponseAdapter.toApiResponse(response));
  }

  protected unauthorized(res: Response, response?: ServiceFailureResponse) {
    if (response == null) return res.sendStatus(401);

    return res.status(401).json(ServiceResponseAdapter.toApiResponse(response));
  }

  protected ok<T>(res: Response, response?: ServiceSuccessResponse<T>) {
    if (response == null) return res.sendStatus(200);

    return res.status(200).json(ServiceResponseAdapter.toApiResponse(response));
  }

  protected internalServerError(
    res: Response,
    response?: ServiceFailureResponse
  ) {
    if (response == null) return res.sendStatus(500);

    return res.status(500).json(ServiceResponseAdapter.toApiResponse(response));
  }
}
