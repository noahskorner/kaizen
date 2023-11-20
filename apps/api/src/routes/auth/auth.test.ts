import { ErrorKey } from '@kaizen/core';
import supertest from 'supertest';
import { app } from '../../app';
import { createUniqueEmail } from '../../fixtures/create-unique-email';
import { expectError } from '../../fixtures/expect-error';
import { getRefreshToken } from '../../fixtures/get-refresh-token';
import { validPassword } from '../../fixtures/valid-password';
import { REFRESH_TOKEN_COOKIE_KEY } from './refresh-token-cookie-key';
import * as env from '@kaizen/env-server';
import { createAndLoginUser } from '../../fixtures/create-and-login-user';
import { CreateUserCommand } from '@kaizen/user-server';
import { AuthToken, LoginRequest } from '@kaizen/auth';
const mockEnvironment = env.serverEnvironment;

describe('/auth should', () => {
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
      const response = await supertest(app).post('/auth').send();

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
      const response = await supertest(app).post('/auth').send(request);

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
      const response = await supertest(app).post('/auth').send(request);

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
      const response = await supertest(app).post('/auth').send(request);

      // Assert
      expect(response.statusCode).toBe(401);
      expectError(response, ErrorKey.LOGIN_INCORECT_EMAIL_OR_PASSWORD);
    });
    it('returns 401 if user exists but password incorrect', async () => {
      // Arrange
      const email = createUniqueEmail();
      await supertest(app)
        .post('/user')
        .send({ email, password: validPassword } as CreateUserCommand);
      const request = {
        email: email,
        password: 'incorrect-password'
      };

      // Act
      const response = await supertest(app).post('/auth').send(request);

      // Assert
      expect(response.statusCode).toBe(401);
      expectError(response, ErrorKey.LOGIN_INCORECT_EMAIL_OR_PASSWORD);
    });
    it('returns 200 if user exists and password correct', async () => {
      // Arrange
      const email = createUniqueEmail();
      await supertest(app)
        .post('/user')
        .send({ email, password: validPassword } as CreateUserCommand);
      const request = {
        email: email,
        password: validPassword
      };

      // Act
      const response = await supertest(app).post('/auth').send(request);
      const body: AuthToken = response.body;
      const refreshToken = getRefreshToken(response);

      // Assert
      expect(response.statusCode).toBe(200);
      expect(body.accessToken).toBeDefined();
      expect(body.refreshToken).toBeDefined();
      expect(body.refreshToken).toBe(refreshToken);
    });
  });
  describe('refreshToken should', () => {
    it('returns 401 if refresh token is not provided', async () => {
      // Act
      const response = await supertest(app).get('/auth');

      // Assert
      expect(response.statusCode).toBe(401);
      expectError(response, ErrorKey.REFRESH_TOKEN_INVALID);
    });
    it('returns 401 if refresh token is invalid', async () => {
      // Act
      const response = await supertest(app)
        .get('/auth')
        .set('Cookie', [`${REFRESH_TOKEN_COOKIE_KEY}=null`]);

      // Assert
      expect(response.statusCode).toBe(401);
      expectError(response, ErrorKey.REFRESH_TOKEN_INVALID);
    });
    it('returns 401 if refresh token is expired', async () => {
      // Arrange
      env.serverEnvironment.REFRESH_TOKEN_EXPIRATION = '0s';
      const { refreshToken } = await createAndLoginUser();

      // Act
      const response = await supertest(app)
        .get('/auth')
        .set('Cookie', [`${REFRESH_TOKEN_COOKIE_KEY}=${refreshToken}`]);

      // Assert
      expect(response.statusCode).toBe(401);
      expectError(response, ErrorKey.REFRESH_TOKEN_EXPIRED);
    });
    it('returns 200 if refreshToken is valid', async () => {
      // Arrange
      const { refreshToken } = await createAndLoginUser();

      // Act
      const response = await supertest(app)
        .get('/auth')
        .set('Cookie', [`${REFRESH_TOKEN_COOKIE_KEY}=${refreshToken}`]);
      const refreshedToken = getRefreshToken(response);

      // Assert
      expect(response.statusCode).toBe(200);
      expect(response.body.accessToken).toBeDefined();
      expect(response.body.refreshToken).toBeDefined();
      expect(response.body.refreshToken).toBe(refreshedToken);
    });
  });
  describe('logout should', () => {
    it('returns 401 when accessToken does not exist', async () => {
      // Act
      const response = await supertest(app).delete('/auth');

      // Assert
      expect(response.statusCode).toBe(401);
    });
    it('returns 401 when accessToken is invalid', async () => {
      // Act
      const response = await supertest(app)
        .delete('/auth')
        .auth('invalid-token', { type: 'bearer' });

      // Assert
      expect(response.statusCode).toBe(401);
    });
    it('returns 401 when accessToken is expired', async () => {
      // Arrange
      env.serverEnvironment.ACCESS_TOKEN_EXPIRATION = '0s';
      const { accessToken } = await createAndLoginUser();

      // Act
      const response = await supertest(app)
        .delete('/auth')
        .auth(accessToken, { type: 'bearer' });

      // Assert
      expect(response.statusCode).toBe(401);
    });
    it('returns 200 when accessToken is valid', async () => {
      // Arrange
      const { accessToken } = await createAndLoginUser();

      // Act
      const response = await supertest(app)
        .delete('/auth')
        .auth(accessToken, { type: 'bearer' });
      const refreshToken = getRefreshToken(response);

      // Assert
      expect(response.statusCode).toBe(200);
      expect(refreshToken).toBeNull();
    });
  });
});
