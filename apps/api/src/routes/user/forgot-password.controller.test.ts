import { defaultTestBed, expectError } from '../../../test';
import supertest from 'supertest';
import { ErrorCode, ServiceFailureResponse } from '@kaizen/core';

describe('/user/password/forgot', () => {
  describe('forgot should', () => {
    it('returns 400 when email is empty', async () => {
      // Arrange && Act
      const response = await supertest(defaultTestBed).post(
        '/user/password/forgot'
      );
      const body = response.body as ServiceFailureResponse;

      // Assert
      expect(response.status).toBe(400);
      expectError(body.errors, ErrorCode.CREATE_USER_INVALID_EMAIL);
    });
  });
});
