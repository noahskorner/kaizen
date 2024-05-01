import { ApiSuccessResponse, ErrorCode } from '@kaizen/core';
import supertest from 'supertest';
import { AuthToken, LoginRequest } from '@kaizen/auth';
import { CreateUserCommand, User } from '@kaizen/user';
import {
  defaultTestBed,
  expectError,
  createUniqueEmail,
  validPassword,
  getRefreshToken,
  buildTestBed
} from '../../../test';
import { LoginSuccessEvent, ServiceEventType } from '@kaizen/core-server';

describe('/auth', () => {
  describe('login should', () => {
    it('returns 401 if request is empty', async () => {
      // Act
      const response = await supertest(defaultTestBed).post('/auth').send();

      // Assert
      expect(response.statusCode).toBe(401);
      expectError(response, ErrorCode.LOGIN_INCORECT_EMAIL_OR_PASSWORD);
    });
    it('returns 401 if email or password is empty', async () => {
      // Arrange
      const request: LoginRequest = {
        email: '',
        password: ''
      };

      // Act
      const response = await supertest(defaultTestBed)
        .post('/auth')
        .send(request);

      // Assert
      expect(response.statusCode).toBe(401);
      expectError(response, ErrorCode.LOGIN_INCORECT_EMAIL_OR_PASSWORD);
    });
    it('returns 401 if user does not exist', async () => {
      // Arrange
      const request = {
        email: 'not-an-email'
      };

      // Act
      const response = await supertest(defaultTestBed)
        .post('/auth')
        .send(request);

      // Assert
      expect(response.statusCode).toBe(401);
      expectError(response, ErrorCode.LOGIN_INCORECT_EMAIL_OR_PASSWORD);
    });
    it('returns 401 if user exists but password not provided', async () => {
      // Arrange
      const request = {
        email: createUniqueEmail()
      };

      // Act
      const response = await supertest(defaultTestBed)
        .post('/auth')
        .send(request);

      // Assert
      expect(response.statusCode).toBe(401);
      expectError(response, ErrorCode.LOGIN_INCORECT_EMAIL_OR_PASSWORD);
    });
    it('returns 401 if user exists but password incorrect', async () => {
      // Arrange
      const email = createUniqueEmail();
      await supertest(defaultTestBed)
        .post('/user')
        .send({ email, password: validPassword } satisfies CreateUserCommand);
      const request = {
        email: email,
        password: 'incorrect-password'
      };

      // Act
      const response = await supertest(defaultTestBed)
        .post('/auth')
        .send(request);

      // Assert
      expect(response.statusCode).toBe(401);
      expectError(response, ErrorCode.LOGIN_INCORECT_EMAIL_OR_PASSWORD);
    });
    it('returns 200 if user exists and password correct', async () => {
      // Arrange
      const email = createUniqueEmail();
      await supertest(defaultTestBed)
        .post('/user')
        .send({ email, password: validPassword } satisfies CreateUserCommand);
      const request = {
        email: email,
        password: validPassword
      };

      // Act
      const response = await supertest(defaultTestBed)
        .post('/auth')
        .send(request);
      const body: ApiSuccessResponse<AuthToken> = response.body;
      const refreshToken = getRefreshToken(response);

      // Assert
      expect(response.statusCode).toBe(200);
      expect(body.data.accessToken).toBeDefined();
      expect(body.data.refreshToken).toBeDefined();
      expect(body.data.refreshToken).toBe(refreshToken);
    });
    it(`emits a ${ServiceEventType.LOGIN_SUCCESS} event`, async () => {
      // Arrange
      const { serviceEventBus, testBed } = buildTestBed();
      const spy = jest.spyOn(serviceEventBus, 'publish');
      const email = createUniqueEmail();
      const user: User = (
        await supertest(testBed)
          .post('/user')
          .send({ email, password: validPassword } satisfies CreateUserCommand)
      ).body.data;
      const request = {
        email: email,
        password: validPassword
      };
      const expected: LoginSuccessEvent = {
        type: ServiceEventType.LOGIN_SUCCESS,
        payload: {
          userId: user.id
        }
      };

      // Act
      await supertest(testBed).post('/auth').send(request);

      // Assert
      expect(spy).toHaveBeenCalledWith(expected);
    });
  });
});
