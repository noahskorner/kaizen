import supertest from 'supertest';
import {
  buildTestBed,
  createAndLoginUser,
  defaultTestBed,
  expectError
} from '../../../test';
import { ErrorCode } from '@kaizen/core';
import { v4 as uuid } from 'uuid';

describe('/wallet', () => {
  describe('get should', () => {
    it("returns 403 when requesting someone else's wallet", async () => {
      // Arrange
      const { authToken } = await createAndLoginUser(defaultTestBed);

      // Act
      const response = await supertest(defaultTestBed)
        .get(`/wallet/user/${uuid()}`)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.statusCode).toBe(403);
      expectError(response, ErrorCode.GET_WALLET_NOT_YOUR_WALLET);
    });
    it('returns 404 when wallet not found', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { user, authToken } = await createAndLoginUser(testBed);

      // Act
      const response = await supertest(testBed)
        .get(`/wallet/user/${user.id}`)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.statusCode).toBe(404);
      expectError(response, ErrorCode.GET_WALLET_NOT_FOUND);
    });
  });
});
