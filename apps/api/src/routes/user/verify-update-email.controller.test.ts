import supertest from 'supertest';
import { createAndLoginUser } from '../../../test/create-and-login-user';
import { defaultTestBed } from '../../../test/default-test-bed';
import { expectError } from '../../../test/expect-error';
import { ErrorCode, ServiceSuccessResponse } from '@kaizen/core';
import {
  UpdateEmailCommand,
  User,
  VerifyUpdateEmailRequest
} from '@kaizen/user';
import { v4 as uuid } from 'uuid';
import { createUniqueEmail } from '../../../test/create-unique-email';
import {
  FindUserByEmailRepository,
  UpdateEmailService
} from '@kaizen/user-server';
import { environment } from '../../env';
import { cachedPrismaClient } from '../../../test/build-test-bed';
import { LocalEmailProvider } from '@kaizen/core-server';

describe('/user/email', () => {
  describe('update should', () => {
    it('returns 400 when token not provided', async () => {
      // Act
      const response = await supertest(defaultTestBed)
        .put(`/user/email`)
        .send();

      // Assert
      expect(response.statusCode).toBe(400);
      expectError(response, ErrorCode.VERIFY_UPDATE_EMAIL_TOKEN_NOT_PROVIDED);
    });
    it('returns 401 when token not valid', async () => {
      // Arrange
      const request: VerifyUpdateEmailRequest = {
        token: uuid()
      };

      // Act
      const response = await supertest(defaultTestBed)
        .put(`/user/email`)
        .send(request);

      // Assert
      expect(response.statusCode).toBe(401);
      expectError(response, ErrorCode.VERIFY_UPDATE_EMAIL_TOKEN_NOT_VALID);
    });
    it("returns 200 and the user with it's email updated", async () => {
      // Arrange
      const { user } = await createAndLoginUser(defaultTestBed);
      const localEmailProvider = new LocalEmailProvider();
      const findUserByEmailRepository = new FindUserByEmailRepository(
        cachedPrismaClient
      );
      const updateEmailService = new UpdateEmailService(
        environment.FRONTEND_DOMAIN,
        environment.EMAIL_VERIFICATION_SECRET,
        environment.EMAIL_VERIFICATION_EXPIRATION,
        findUserByEmailRepository,
        localEmailProvider
      );
      const uniqueEmail = createUniqueEmail();
      const updateEmailResponse = await updateEmailService.update({
        userId: user.id,
        email: uniqueEmail
      } satisfies UpdateEmailCommand);
      if (updateEmailResponse.type === 'FAILURE')
        throw new Error('Unable to create update email verification token.');

      // Act
      const response = await supertest(defaultTestBed)
        .put(`/user/email`)
        .send({
          token: updateEmailResponse.data.token
        } satisfies VerifyUpdateEmailRequest);
      const body = response.body as ServiceSuccessResponse<User>;

      // Assert
      expect(response.statusCode).toBe(200);
      expect(body.data.id).toBe(user.id);
      expect(body.data.email).toBe(uniqueEmail);
    });
  });
});
