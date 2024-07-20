import {
  ErrorCode,
  ServiceResponse,
  UpdateEmailAlreadyInUseError
} from '@kaizen/core';
import { IEmailProvider, SendEmailCommand, Service } from '@kaizen/core-server';
import {
  EmailVerificationToken,
  IFindUserByEmailRepository,
  IUpdateEmailService,
  UpdateEmailResponse,
  UpdateEmailCommand,
  UpdateEmailValidator
} from '@kaizen/user';
import jwt from 'jsonwebtoken';

export class UpdateEmailService extends Service implements IUpdateEmailService {
  constructor(
    private readonly FRONTEND_DOMAIN: string,
    private readonly UPDATE_EMAIL_SECRET: string,
    private readonly UPDATE_EMAIL_EXPIRATION: string,
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly emailProvider: IEmailProvider
  ) {
    super();
  }

  public async update(
    command: UpdateEmailCommand
  ): Promise<ServiceResponse<UpdateEmailResponse>> {
    const errors = UpdateEmailValidator.validate(command);
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
          code: ErrorCode.UPDATE_EMAIL_ALREADY_IN_USE,
          params: { userId: command.userId, email: command.email }
        } satisfies UpdateEmailAlreadyInUseError
      ]);
    }

    const emailVerificationToken = jwt.sign(
      {
        userId: command.userId,
        email: normalizedEmail
      } satisfies EmailVerificationToken,
      this.UPDATE_EMAIL_SECRET,
      {
        expiresIn: this.UPDATE_EMAIL_EXPIRATION
      }
    );

    const response = await this.emailProvider.sendEmail({
      to: normalizedEmail,
      subject: 'Verify your email',
      text: `${this.FRONTEND_DOMAIN}/verify-update-email?token=${emailVerificationToken}`
    } satisfies SendEmailCommand);

    if (response.type === 'FAILURE') return response;

    return this.success({
      token: emailVerificationToken
    } satisfies UpdateEmailResponse);
  }
}
