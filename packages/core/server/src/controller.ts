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
      res.sent = true;
      res.status = 200;
      return next();
    }

    res.sent = true;
    res.status = 200;
    res.body = ServiceResponseAdapter.toApiResponse(response);
    return next();
  };

  protected created = <T>(
    res: MiddlewareResponse,
    next: () => void,
    response: ServiceSuccessResponse<T>
  ) => {
    res.sent = true;
    res.status = 201;
    res.body = ServiceResponseAdapter.toApiResponse(response);

    return next();
  };

  protected badRequest = (
    res: MiddlewareResponse,
    next: () => void,
    response?: ServiceFailureResponse
  ) => {
    if (response == null) {
      res.sent = true;
      res.status = 400;
      return next();
    }

    res.sent = true;
    res.status = 400;
    res.body = ServiceResponseAdapter.toApiResponse(response);
    return next();
  };

  protected unauthorized = (
    res: MiddlewareResponse,
    next: () => void,
    response?: ServiceFailureResponse
  ) => {
    if (response == null) {
      res.sent = true;
      res.status = 401;
      return next();
    }

    res.sent = true;
    res.status = 401;
    res.body = ServiceResponseAdapter.toApiResponse(response);
    return next();
  };
}
