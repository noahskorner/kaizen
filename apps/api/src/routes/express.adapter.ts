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

      const res2ponse = ExpressAdapter.toResponse(res, response);
      return res2ponse;
    };
  }

  private static toMiddlewareRequest(req: Request): MiddlewareRequest {
    const request = {
      headers: req.headers as Record<string, string>,
      params: req.params,
      query: req.query as Record<string, string>,
      cookies: req.cookies,
      body: req.body
    } satisfies Omit<MiddlewareRequest, 'user'>;

    return request as MiddlewareRequest;
  }

  private static toResponse(res: Response, response: MiddlewareResponse) {
    // Attach cookies
    response._setCookie.forEach((cookie) => {
      res.cookie(cookie.key, cookie.value, {
        domain: cookie.domain,
        path: cookie.path,
        expires: cookie.expires,
        httpOnly: cookie.httpOnly,
        secure: cookie.secure,
        sameSite: cookie.sameSite
      });
    });

    // Clear cookies
    response._clearCookie.forEach((cookie) => {
      res.clearCookie(cookie);
    });

    // Send response
    if (response._body == null) {
      return res.sendStatus(response._status);
    }

    return res.status(response._status).send(response._body);
  }
}
