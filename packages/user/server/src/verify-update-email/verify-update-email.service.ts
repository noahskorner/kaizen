import {
  ServiceResponse,
  ErrorCode,
  VerifyUpdateEmailTokenNotProvidedError,
  VerifyUpdateEmailTokenNotValidError
} from '@kaizen/core';
import { Service } from '@kaizen/core-server';
import {
  EmailVerificationToken,
  IUpdateEmailRepository,
  IVerifyUpdateEmailService,
  UpdateEmailQuery,
  User,
  UserAdapter,
  VerifyUpdateEmailCommand
} from '@kaizen/user';
import { verify } from 'jsonwebtoken';

export class VerifyUpdateEmailService
  extends Service
  implements IVerifyUpdateEmailService
{
  constructor(
    private readonly EMAIL_VERIFICATION_SECRET: string,
    private readonly updateEmailRepository: IUpdateEmailRepository
  ) {
    super();
  }

  public async verify(
    command: VerifyUpdateEmailCommand
  ): Promise<ServiceResponse<User>> {
    if (command.token == null) {
      return this.failure({
        code: ErrorCode.VERIFY_UPDATE_EMAIL_TOKEN_NOT_PROVIDED
      } satisfies VerifyUpdateEmailTokenNotProvidedError);
    }

    try {
      const emailVerificationToken = (await verify(
        command.token,
        this.EMAIL_VERIFICATION_SECRET
      )) as EmailVerificationToken;

      const userRecord = await this.updateEmailRepository.update({
        userId: emailVerificationToken.userId,
        normalizedEmail: emailVerificationToken.email
      } satisfies UpdateEmailQuery);

      const user = UserAdapter.toUser(userRecord);
      return this.success(user);
    } catch (error) {
      return this.failure({
        code: ErrorCode.VERIFY_UPDATE_EMAIL_TOKEN_NOT_VALID,
        params: {
          token: command.token
        }
      } satisfies VerifyUpdateEmailTokenNotValidError);
    }
  }
}
