import { ServiceResponse } from '@kaizen/core';
import { Service } from '@kaizen/core-server';
import {
  CreateUserValidator,
  FindUserByEmailQuery,
  ForgotPasswordCommand,
  ForgotPasswordToken,
  IFindUserByEmailRepository,
  IForgotPasswordService
} from '@kaizen/user';
import jwt from 'jsonwebtoken';

export class ForgotPasswordService
  extends Service
  implements IForgotPasswordService
{
  constructor(
    private readonly FORGOT_PASSWORD_SECRET: string,
    private readonly FORGOT_PASSWORD_EXPIRATION: string,
    private readonly findUserByEmailRepository: IFindUserByEmailRepository
    // private readonly emailProvider: IEmailProvider
  ) {
    super();
  }

  public async forgot(
    command: ForgotPasswordCommand
  ): Promise<ServiceResponse<boolean>> {
    const errors = CreateUserValidator.validateEmail(command.email);
    if (errors.length > 0) return this.failures(errors);

    const normalizedEmail = this.normalizeEmail(command.email);
    const user = await this.findUserByEmailRepository.find({
      normalizedEmail
    } satisfies FindUserByEmailQuery);

    if (user == null) return this.success(true);

    const forgotPasswordVerificationToken = jwt.sign(
      {
        id: user.id,
        email: user.email
      } satisfies ForgotPasswordToken,
      this.FORGOT_PASSWORD_SECRET,
      { expiresIn: this.FORGOT_PASSWORD_EXPIRATION }
    );
    console.log(forgotPasswordVerificationToken);

    // TODO: send email

    return this.success(true);
  }
}
