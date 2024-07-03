import { ServiceSuccessResponse } from '@kaizen/core';
import { Controller, EndpointBuilder } from '@kaizen/core-server';

export class HomeController extends Controller {
  public find = new EndpointBuilder()
    .use((req, res, next) => {
      const response: ServiceSuccessResponse<string> = {
        type: 'SUCCESS',
        data: 'Hello world 3!'
      };
      return this.ok(res, next, response);
    })
    .build();
}
