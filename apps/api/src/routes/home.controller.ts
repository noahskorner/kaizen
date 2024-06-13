import { ServiceSuccessResponse } from '@kaizen/core';
import { Controller, RequestHandlerBuilder } from '@kaizen/core-server';

export class HomeController extends Controller {
  public find = new RequestHandlerBuilder()
    .use((req, res, next) => {
      const response: ServiceSuccessResponse<string> = {
        type: 'SUCCESS',
        data: 'Hello world 2!'
      };
      return this.ok(res, next, response);
    })
    .build();
}
