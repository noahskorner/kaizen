import { Controller, RequestHandlerBuilder } from '@kaizen/core-server';

export class HomeController extends Controller {
  public find = new RequestHandlerBuilder()
    .use((req, res, next) => {
      return this.ok(res, next);
    })
    .build();
}
