import {
  ServiceFailureResponse,
  ServiceResponseAdapter,
  ServiceSuccessResponse
} from '@kaizen/core';
import { MiddlewareResponse } from './middleware';

export abstract class Controller {
  protected ok = <T>(
    res: MiddlewareResponse,
    next: () => void,
    response?: ServiceSuccessResponse<T>
  ) => {
    if (response == null) {
      res.send(200);
      return next();
    }

    res.send(200, ServiceResponseAdapter.toApiResponse(response));
    return next();
  };

  protected created = <T>(
    res: MiddlewareResponse,
    next: () => void,
    response: ServiceSuccessResponse<T>
  ) => {
    res.send(201, ServiceResponseAdapter.toApiResponse(response));
    return next();
  };

  protected badRequest = (
    res: MiddlewareResponse,
    next: () => void,
    response?: ServiceFailureResponse
  ) => {
    if (response == null) {
      res.send(400);
      return next();
    }

    res.send(400, ServiceResponseAdapter.toApiResponse(response));
    return next();
  };

  protected unauthorized = (
    res: MiddlewareResponse,
    next: () => void,
    response?: ServiceFailureResponse
  ) => {
    if (response == null) {
      res.send(401);
      return next();
    }

    res.send(401, ServiceResponseAdapter.toApiResponse(response));
    return next();
  };

  protected internalServerError = (
    res: MiddlewareResponse,
    next: () => void,
    response?: ServiceFailureResponse
  ) => {
    if (response == null) {
      res.send(500);
      return next();
    }

    res.send(500, ServiceResponseAdapter.toApiResponse(response));
    return next();
  };
}
