import { ErrorCode } from '@kaizen/core';
import supertest from 'supertest';
import {
  createAndLoginUser,
  createUniqueEmail,
  defaultTestBed,
  expectError
} from '../../../test';
import { UpdateUserEmailRequest } from '@kaizen/user';
import { v4 as uuid } from 'uuid';
import { ServiceCollectionBuilder } from '../../service-collection.builder';
import { AppBuilder } from '../../app-builder';
import { IEmailProvider } from '@kaizen/core-server';

describe('/user/:userId/email', () => {
  describe('update should', () => {
    it('returns 400 when email not provided', async () => {
      // Arrange
      const { user, authToken } = await createAndLoginUser(defaultTestBed);

      // Act
      const response = await supertest(defaultTestBed)
        .patch(`/user/${user.id}/email`)
        .send()
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.statusCode).toBe(400);
      expectError(response, ErrorCode.UPDATE_USER_EMAIL_INVALID_EMAIL);
    });
    it('returns 400 when email invalid', async () => {
      // Arrange
      const { user, authToken } = await createAndLoginUser(defaultTestBed);

      // Act
      const response = await supertest(defaultTestBed)
        .patch(`/user/${user.id}/email`)
        .send({
          email: uuid()
        } satisfies UpdateUserEmailRequest)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.statusCode).toBe(400);
      expectError(response, ErrorCode.UPDATE_USER_EMAIL_INVALID_EMAIL);
    });
    it('returns 400 when email already in use', async () => {
      // Arrange
      const { user: existingUser } = await createAndLoginUser(defaultTestBed);
      const { user, authToken } = await createAndLoginUser(defaultTestBed);

      // Act
      const response = await supertest(defaultTestBed)
        .patch(`/user/${user.id}/email`)
        .send({
          email: existingUser.email
        } satisfies UpdateUserEmailRequest)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.statusCode).toBe(400);
      expectError(response, ErrorCode.UPDATE_USER_EMAIL_ALREADY_IN_USE);
    });
    it('returns 500 when email provider fails', async () => {
      // Arrange
      const mockEmailProvider: IEmailProvider = {
        sendEmail: jest.fn().mockResolvedValue({
          type: 'FAILURE',
          errors: [
            {
              code: ErrorCode.EMAIL_PROVIDER_SEND_EMAIL_FAILED,
              params: {}
            }
          ]
        })
      };
      const mockServiceCollection = new ServiceCollectionBuilder()
        .withEmailProvider(mockEmailProvider)
        .build();
      const testBed = new AppBuilder()
        .withServiceCollection(mockServiceCollection)
        .build();
      const { user, authToken } = await createAndLoginUser(testBed);

      // Act
      const response = await supertest(testBed)
        .patch(`/user/${user.id}/email`)
        .send({
          email: createUniqueEmail()
        } satisfies UpdateUserEmailRequest)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.statusCode).toBe(500);
      expectError(response, ErrorCode.EMAIL_PROVIDER_SEND_EMAIL_FAILED);
    });
    it('returns 200 and sends email', async () => {
      // Arrange
      const mockEmailProvider: IEmailProvider = {
        sendEmail: jest.fn().mockResolvedValue({
          type: 'SUCCESS',
          data: true
        })
      };
      const mockServiceCollection = new ServiceCollectionBuilder()
        .withEmailProvider(mockEmailProvider)
        .build();
      const testBed = new AppBuilder()
        .withServiceCollection(mockServiceCollection)
        .build();
      const { user, authToken } = await createAndLoginUser(testBed);

      // Act
      const response = await supertest(testBed)
        .patch(`/user/${user.id}/email`)
        .send({
          email: createUniqueEmail()
        } satisfies UpdateUserEmailRequest)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.statusCode).toBe(200);
      expect(mockEmailProvider.sendEmail).toHaveBeenCalled();
    });
  });
});
