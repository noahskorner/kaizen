import { ErrorCode } from '@kaizen/core';
import supertest from 'supertest';
import { UpdatePasswordRequest } from '@kaizen/user';
import {
  defaultTestBed,
  expectError,
  validPassword,
  createAndLoginUser
} from '../../../test';

describe('/user/password/token', () => {
  describe('update should', () => {
    it('returns 400 when password not provided', async () => {
      // Arrange
      const { authToken } = await createAndLoginUser(defaultTestBed);

      // Act
      const response = await supertest(defaultTestBed)
        .post(`/user/password/token`)
        .send({})
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.statusCode).toBe(400);
      expectError(response, ErrorCode.CREATE_USER_INVALID_PASSWORD);
    });
    it('returns 400 when password not long enough', async () => {
      // Arrange
      const { authToken } = await createAndLoginUser(defaultTestBed);
      const request: UpdatePasswordRequest = {
        password: '1234567'
      };

      // Act
      const response = await supertest(defaultTestBed)
        .post(`/user/password/token`)
        .send(request)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.statusCode).toBe(400);
      expectError(response, ErrorCode.CREATE_USER_PASSWORD_TOO_SHORT);
    });
    it('returns 400 when password has no numbers', async () => {
      // Arrange
      const { authToken } = await createAndLoginUser(defaultTestBed);
      const request: UpdatePasswordRequest = {
        password: 'abcdefghi'
      };

      // Act
      const response = await supertest(defaultTestBed)
        .post(`/user/password/token`)
        .send(request)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.statusCode).toBe(400);
      expectError(response, ErrorCode.CREATE_USER_PASSWORD_NO_NUMBER);
    });
    it('returns 400 when password has no symbols', async () => {
      // Arrange
      const { authToken } = await createAndLoginUser(defaultTestBed);
      const request: UpdatePasswordRequest = {
        password: '1234567a'
      };

      // Act
      const response = await supertest(defaultTestBed)
        .post(`/user/password/token`)
        .send(request)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.statusCode).toBe(400);
      expectError(response, ErrorCode.CREATE_USER_PASSWORD_NO_SYMBOL);
    });
    it('returns 200', async () => {
      // Arrange
      const { authToken } = await createAndLoginUser(defaultTestBed);
      const request: UpdatePasswordRequest = {
        password: validPassword
      };

      // Act
      const response = await supertest(defaultTestBed)
        .post(`/user/password/token`)
        .send(request)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.statusCode).toBe(200);
    });
  });
});
