import supertest from 'supertest';
import { buildTestBed } from '../../../../test/build-test-bed';
import { createAndLoginUser } from '../../../../test/create-and-login-user';
import { ErrorCode } from '@kaizen/core';
import { expectError } from '../../../../test/expect-error';

describe('/exchange-rate/:base', () => {
  describe('get should', () => {
    it('returns 500 when base currency is invalid', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { authToken } = await createAndLoginUser(testBed);

      // Act
      const response = await supertest(testBed)
        .get('/exchange-rate/DUMMY_CURRENCY')
        .auth(authToken.accessToken, { type: 'bearer' });

      // Asserts
      expect(response.status).toBe(500);
      expectError(response, ErrorCode.EXCHANGE_RATE_REQUEST_FAILED);
    });
    it('returns 200 and latest exchange rates', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { authToken } = await createAndLoginUser(testBed);

      // Act
      const response = await supertest(testBed)
        .get('/exchange-rate/USD')
        .auth(authToken.accessToken, { type: 'bearer' });

      // Asserts
      expect(response.status).toBe(200);
    });
  });
});
