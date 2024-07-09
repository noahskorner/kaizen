import {
  ErrorCode,
  ServiceResponse,
  UpdateUserEmailAlreadyInUseError
} from '@kaizen/core';
import { IEmailProvider, SendEmailCommand, Service } from '@kaizen/core-server';
import {
  EmailVerificationToken,
  IFindUserByEmailRepository,
  IUpdateUserEmailService,
  UpdateUserEmailCommand,
  UpdateUserEmailValidator
} from '@kaizen/user';
import jwt from 'jsonwebtoken';

export class UpdateUserEmailService
  extends Service
  implements IUpdateUserEmailService
{
  constructor(
    private readonly EMAIL_VERIFICATION_SECRET: string,
    private readonly EMAIL_VERIFICATION_EXPIRATION: string,
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly emailProvider: IEmailProvider
  ) {
    super();
  }

  public async update(
    command: UpdateUserEmailCommand
  ): Promise<ServiceResponse<boolean>> {
    const errors = UpdateUserEmailValidator.validate(command);
    if (errors.length > 0) {
      return this.failures(errors);
    }

    const normalizedEmail = command.email.toLowerCase();
    const existingUser = await this.findUserByEmailRepository.find({
      normalizedEmail: normalizedEmail
    });
    if (existingUser != null) {
      return this.failures([
        {
          code: ErrorCode.UPDATE_USER_EMAIL_ALREADY_IN_USE,
          params: { userId: command.userId, email: command.email }
        } satisfies UpdateUserEmailAlreadyInUseError
      ]);
    }

    const emailVerificationToken = jwt.sign(
      {
        userId: command.userId,
        email: normalizedEmail
      } satisfies EmailVerificationToken,
      this.EMAIL_VERIFICATION_SECRET,
      {
        expiresIn: this.EMAIL_VERIFICATION_EXPIRATION
      }
    );

    const response = await this.emailProvider.sendEmail({
      to: normalizedEmail,
      subject: 'Verify your email',
      text: emailVerificationToken
    } satisfies SendEmailCommand);

    if (response.type === 'FAILURE') return response;

    return this.success(true);
  }
}
