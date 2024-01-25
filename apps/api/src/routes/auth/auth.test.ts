import { ApiSuccessResponse, ErrorKey } from '@kaizen/core';
import supertest from 'supertest';
import { createUniqueEmail } from '../../fixtures/create-unique-email';
import { expectError } from '../../fixtures/expect-error';
import { getRefreshToken } from '../../fixtures/get-refresh-token';
import { validPassword } from '../../fixtures/valid-password';
import { REFRESH_TOKEN_COOKIE_KEY } from './refresh-token-cookie-key';
import * as env from '@kaizen/env-server';
import { createAndLoginUser } from '../../fixtures/create-and-login-user';
import { AuthToken, LoginRequest } from '@kaizen/auth';
import { CreateUserCommand } from '@kaizen/user';
import { appFixture } from '../../app.fixture';
const mockEnvironment = env.serverEnvironment;

describe('/auth', () => {
  beforeAll(() => {
    jest.mock('@kaizen/env-server', () => ({
      environment: mockEnvironment
    }));
  });
  beforeEach(() => {
    env.serverEnvironment.REFRESH_TOKEN_EXPIRATION = '5m';
    env.serverEnvironment.ACCESS_TOKEN_EXPIRATION = '5m';
  });
  describe('login should', () => {
    it('returns 401 if request is empty', async () => {
      // Act
      const response = await supertest(appFixture).post('/auth').send();

      // Assert
      expect(response.statusCode).toBe(401);
      expectError(response, ErrorKey.LOGIN_INCORECT_EMAIL_OR_PASSWORD);
    });
    it('returns 401 if email or password is empty', async () => {
      // Arrange
      const request: LoginRequest = {
        email: '',
        password: ''
      };

      // Act
      const response = await supertest(appFixture).post('/auth').send(request);

      // Assert
      expect(response.statusCode).toBe(401);
      expectError(response, ErrorKey.LOGIN_INCORECT_EMAIL_OR_PASSWORD);
    });
    it('returns 401 if user does not exist', async () => {
      // Arrange
      const request = {
        email: 'not-an-email'
      };

      // Act
      const response = await supertest(appFixture).post('/auth').send(request);

      // Assert
      expect(response.statusCode).toBe(401);
      expectError(response, ErrorKey.LOGIN_INCORECT_EMAIL_OR_PASSWORD);
    });
    it('returns 401 if user exists but password not provided', async () => {
      // Arrange
      const request = {
        email: createUniqueEmail()
      };

      // Act
      const response = await supertest(appFixture).post('/auth').send(request);

      // Assert
      expect(response.statusCode).toBe(401);
      expectError(response, ErrorKey.LOGIN_INCORECT_EMAIL_OR_PASSWORD);
    });
    it('returns 401 if user exists but password incorrect', async () => {
      // Arrange
      const email = createUniqueEmail();
      await supertest(appFixture)
        .post('/user')
        .send({ email, password: validPassword } as CreateUserCommand);
      const request = {
        email: email,
        password: 'incorrect-password'
      };

      // Act
      const response = await supertest(appFixture).post('/auth').send(request);

      // Assert
      expect(response.statusCode).toBe(401);
      expectError(response, ErrorKey.LOGIN_INCORECT_EMAIL_OR_PASSWORD);
    });
    it('returns 200 if user exists and password correct', async () => {
      // Arrange
      const email = createUniqueEmail();
      await supertest(appFixture)
        .post('/user')
        .send({ email, password: validPassword } as CreateUserCommand);
      const request = {
        email: email,
        password: validPassword
      };

      // Act
      const response = await supertest(appFixture).post('/auth').send(request);
      const body: ApiSuccessResponse<AuthToken> = response.body;
      const refreshToken = getRefreshToken(response);

      // Assert
      expect(response.statusCode).toBe(200);
      expect(body.data.accessToken).toBeDefined();
      expect(body.data.refreshToken).toBeDefined();
      expect(body.data.refreshToken).toBe(refreshToken);
    });
  });
  describe('refreshToken should', () => {
    it('returns 401 if refresh token is not provided', async () => {
      // Act
      const response = await supertest(appFixture).get('/auth');

      // Assert
      expect(response.statusCode).toBe(401);
      expectError(response, ErrorKey.REFRESH_TOKEN_INVALID);
    });
    it('returns 401 if refresh token is invalid', async () => {
      // Act
      const response = await supertest(appFixture)
        .get('/auth')
        .set('Cookie', [`${REFRESH_TOKEN_COOKIE_KEY}=null`]);

      // Assert
      expect(response.statusCode).toBe(401);
      expectError(response, ErrorKey.REFRESH_TOKEN_INVALID);
    });
    it('returns 401 if refresh token is expired', async () => {
      // Arrange
      env.serverEnvironment.REFRESH_TOKEN_EXPIRATION = '0s';
      const { authToken } = await createAndLoginUser();

      // Act
      const response = await supertest(appFixture)
        .get('/auth')
        .set('Cookie', [
          `${REFRESH_TOKEN_COOKIE_KEY}=${authToken.refreshToken}`
        ]);

      // Assert
      expect(response.statusCode).toBe(401);
      expectError(response, ErrorKey.REFRESH_TOKEN_EXPIRED);
    });
    it('returns 200 if refreshToken is valid', async () => {
      // Arrange
      const { authToken } = await createAndLoginUser();

      // Act
      const response = await supertest(appFixture)
        .get('/auth')
        .set('Cookie', [
          `${REFRESH_TOKEN_COOKIE_KEY}=${authToken.refreshToken}`
        ]);
      const body: ApiSuccessResponse<AuthToken> = response.body;
      const refreshedToken = getRefreshToken(response);

      // Assert
      expect(response.statusCode).toBe(200);
      expect(body.data.accessToken).toBeDefined();
      expect(body.data.refreshToken).toBeDefined();
      expect(body.data.refreshToken).toBe(refreshedToken);
    });
  });
  describe('logout should', () => {
    it('returns 401 when accessToken does not exist', async () => {
      // Act
      const response = await supertest(appFixture).delete('/auth');

      // Assert
      expect(response.statusCode).toBe(401);
    });
    it('returns 401 when accessToken is invalid', async () => {
      // Act
      const response = await supertest(appFixture)
        .delete('/auth')
        .auth('invalid-token', { type: 'bearer' });

      // Assert
      expect(response.statusCode).toBe(401);
    });
    it('returns 401 when accessToken is expired', async () => {
      // Arrange
      env.serverEnvironment.ACCESS_TOKEN_EXPIRATION = '0s';
      const { authToken } = await createAndLoginUser();

      // Act
      const response = await supertest(appFixture)
        .delete('/auth')
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.statusCode).toBe(401);
    });
    it('returns 200 when accessToken is valid', async () => {
      // Arrange
      const { authToken } = await createAndLoginUser();

      // Act
      const response = await supertest(appFixture)
        .delete('/auth')
        .auth(authToken.accessToken, { type: 'bearer' });
      const refreshToken = getRefreshToken(response);

      // Assert
      expect(response.statusCode).toBe(200);
      expect(refreshToken).toBeNull();
    });
  });
});
