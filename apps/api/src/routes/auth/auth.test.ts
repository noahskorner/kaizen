import { AuthToken } from '@kaizen/core';
import { CreateUserCommand, ErrorKey } from '@kaizen/services';
import supertest from 'supertest';
import { app } from '../../app';
import { createUniqueEmail } from '../../fixtures/create-unique-email';
import { expectError } from '../../fixtures/expect-error';
import { getRefreshToken } from '../../fixtures/get-refresh-token';
import { validPassword } from '../../fixtures/valid-password';
import { REFRESH_TOKEN_COOKIE_KEY } from './refresh-token-cookie-key';
import * as env from '@kaizen/env';
import { createAndLoginUser } from '../../fixtures/create-and-login-user';
const mockEnvironment = env.environment;

describe('/auth should', () => {
  beforeAll(() => {
    jest.mock('@kaizen/env', () => ({
      environment: mockEnvironment
    }));
  });
  beforeEach(() => {
    env.environment.REFRESH_TOKEN_EXPIRATION = '5m';
  });
  describe('login should', () => {
    it('returns 401 if request is empty', async () => {
      // Act
      const response = await supertest(app).post('/auth').send();

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
      env.environment.REFRESH_TOKEN_EXPIRATION = '0s';
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
});
