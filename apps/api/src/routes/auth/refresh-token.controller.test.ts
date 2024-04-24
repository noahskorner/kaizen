import supertest from 'supertest';
import { serverEnvironment } from '@kaizen/env-server';
import { ServiceCollectionBuilder } from '../../service-collection.builder';
import { AppBuilder } from '../../app-builder';
import {
  defaultTestBed,
  getRefreshToken,
  createAndLoginUser,
  expectError
} from '../../../test';
import { ApiSuccessResponse, ErrorCode } from '@kaizen/core';
import { REFRESH_TOKEN_COOKIE_KEY } from '@kaizen/auth-server';
import { AuthToken } from '@kaizen/auth';

describe('/auth', () => {
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
});
