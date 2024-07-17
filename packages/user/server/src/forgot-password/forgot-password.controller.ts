import { ForgotPasswordRequest, IForgotPasswordService } from '@kaizen/user';
import { Controller, EndpointBuilder } from '@kaizen/core-server';

export class ForgotPasswordController extends Controller {
  constructor(private readonly forgotPasswordService: IForgotPasswordService) {
    super();
  }

  public forgot = new EndpointBuilder()
    .use(async (req, res, next) => {
      const request = req.body as ForgotPasswordRequest;
      const response = await this.forgotPasswordService.forgot(request);

      if (response.type === 'FAILURE') {
        return this.badRequest(res, next, response);
      }

      return this.ok(res, next, response);
    })
    .build();
}
