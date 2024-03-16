import { ApiSuccessResponse, ErrorCode } from '@kaizen/core';
import supertest from 'supertest';
import { REFRESH_TOKEN_COOKIE_KEY } from './refresh-token-cookie-key';
import { AuthToken, LoginRequest } from '@kaizen/auth';
import { CreateUserCommand } from '@kaizen/user';
import { serverEnvironment } from '@kaizen/env-server';
import { ServiceCollectionBuilder } from '../../service-collection.builder';
import { AppBuilder } from '../../app-builder';
import {
  defaultTestBed,
  expectError,
  createUniqueEmail,
  validPassword,
  getRefreshToken,
  createAndLoginUser
} from '../../../test';

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
  });
  describe('refreshToken should', () => {
    it('returns 401 if refreshToken is not provided', async () => {
      // Act
      const response = await supertest(defaultTestBed).get('/auth');

      // Assert
      expect(response.statusCode).toBe(401);
      expectError(response, ErrorCode.REFRESH_TOKEN_INVALID);
    });
    it('returns 401 if refreshToken is invalid', async () => {
      // Act
      const response = await supertest(defaultTestBed)
        .get('/auth')
        .set('Cookie', [`${REFRESH_TOKEN_COOKIE_KEY}=null`]);

      // Assert
      expect(response.statusCode).toBe(401);
      expectError(response, ErrorCode.REFRESH_TOKEN_INVALID);
    });
    it('returns 401 if refreshToken is expired', async () => {
      // Arrange
      const mockServiceCollection = new ServiceCollectionBuilder()
        .withEnvironment({
          ...serverEnvironment,
          REFRESH_TOKEN_EXPIRATION: '0s'
        })
        .build();
      const testBed = new AppBuilder()
        .withServiceCollection(mockServiceCollection)
        .build();
      const { authToken } = await createAndLoginUser(testBed);

      // Act
      const response = await supertest(testBed)
        .get('/auth')
        .set('Cookie', [
          `${REFRESH_TOKEN_COOKIE_KEY}=${authToken.refreshToken}`
        ]);

      // Assert
      expect(response.statusCode).toBe(401);
      expectError(response, ErrorCode.REFRESH_TOKEN_EXPIRED);
    });
    it('returns 200 if refreshToken is valid', async () => {
      // Arrange
      const { authToken } = await createAndLoginUser(defaultTestBed);

      // Act
      const response = await supertest(defaultTestBed)
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
      const response = await supertest(defaultTestBed).delete('/auth');

      // Assert
      expect(response.statusCode).toBe(401);
    });
    it('returns 401 when accessToken is invalid', async () => {
      // Act
      const response = await supertest(defaultTestBed)
        .delete('/auth')
        .auth('invalid-token', { type: 'bearer' });

      // Assert
      expect(response.statusCode).toBe(401);
    });
    it('returns 401 when accessToken is expired', async () => {
      // Arrange
      const mockServiceCollection = new ServiceCollectionBuilder()
        .withEnvironment({
          ...serverEnvironment,
          ACCESS_TOKEN_EXPIRATION: '0s'
        })
        .build();
      const testBed = new AppBuilder()
        .withServiceCollection(mockServiceCollection)
        .build();
      const { authToken } = await createAndLoginUser(testBed);

      // Act
      const response = await supertest(testBed)
        .delete('/auth')
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.statusCode).toBe(401);
    });
    it('returns 200 when accessToken is valid', async () => {
      // Arrange
      const { authToken } = await createAndLoginUser(defaultTestBed);

      // Act
      const response = await supertest(defaultTestBed)
        .delete('/auth')
        .auth(authToken.accessToken, { type: 'bearer' });
      const refreshToken = getRefreshToken(response);

      // Assert
      expect(response.statusCode).toBe(200);
      expect(refreshToken).toBeNull();
    });
  });
});
