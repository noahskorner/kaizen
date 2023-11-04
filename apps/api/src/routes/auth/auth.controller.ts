import { LoginCommand, LoginService } from '@kaizen/services';
import { Request, Response } from 'express';
import { Controller } from '../controller';

export class AuthController extends Controller {
  private readonly _loginService: LoginService;

  constructor() {
    super();
    this._loginService = new LoginService();
  }

  public async login(req: Request, res: Response) {
    const command: LoginCommand = req.body;

    const response = await this._loginService.login(command);

    if (response.type === 'FAILURE') {
      return this.unauthorized(res, response);
    }

    return this.ok(res, response);
  }
}
