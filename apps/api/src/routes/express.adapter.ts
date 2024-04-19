import {
  MiddlewareRequest,
  MiddlewareResponse,
  RequestHandler
} from '@kaizen/core-server';
import { Request, Response } from 'express';

export class ExpressAdapter {
  public static toRequestHandler(handler: RequestHandler) {
    return async (req: Request, res: Response) => {
      const request = ExpressAdapter.toMiddlewareRequest(req);
      const response = await handler(request);

      return ExpressAdapter.toResponse(res, response);
    };
  }

  private static toMiddlewareRequest(req: Request): MiddlewareRequest {
    return {
      body: req.body
    } satisfies MiddlewareRequest;
  }

  private static toResponse(res: Response, response: MiddlewareResponse) {
    if (response.body == null) {
      return res.sendStatus(response.status);
    }

    return res.status(response.status).send(response.body);
  }
}
