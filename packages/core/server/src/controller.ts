import {
  ServiceFailureResponse,
  ServiceResponseAdapter,
  ServiceSuccessResponse
} from '@kaizen/core';
import { MiddlewareResponse } from './middleware';

export abstract class Controller {
  protected created = <T>(
    res: MiddlewareResponse,
    next: () => void,
    response: ServiceSuccessResponse<T>
  ) => {
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
      res.status = 400;
      return next();
    }

    res.status = 400;
    res.body = response;
    return next();
  };
}
