import supertest from 'supertest';
import { Institution } from '@kaizen/finance';
import { ApiSuccessResponse } from '@kaizen/core';
import {
  createAndLoginUser,
  createInstitution,
  expectAccountToBeExternal
} from '../../../../test';
import { buildTestBed } from '../../../../test/build-test-bed';

describe('/institution', () => {
  describe('find should', () => {
    it('returns 401 when user is not logged in', async () => {
      // Act
      const { testBed } = buildTestBed();
      const response = await supertest(testBed).get('/institution');

      // Assert
      expect(response.statusCode).toBe(401);
    });
    it('returns 200 and empty array when no institutions exist', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { authToken } = await createAndLoginUser(testBed);

      // Act
      const response = await supertest(testBed)
        .get('/institution')
        .auth(authToken.accessToken, { type: 'bearer' });
      const body: ApiSuccessResponse<Institution[]> = response.body;

      // Assert
      expect(response.statusCode).toBe(200);
      expect(body.data.length).toBe(0);
    });
    it('returns 200 and list with created institution', async () => {
      // Arrange
      const { testBed, mockAccountsBalanceGetResponse } = buildTestBed();
      const { authToken, user, institution } = await createInstitution(testBed);

      // Act
      const response = await supertest(testBed)
        .get('/institution')
        .auth(authToken.accessToken, { type: 'bearer' });
      const body: ApiSuccessResponse<Institution[]> = response.body;

      // Assert
      expect(response.statusCode).toBe(200);
      expect(body.data.length).toBe(1);
      expect(body.data[0].id).toBe(institution.id);
      expect(body.data[0].userId).toBe(user.id);
      expectAccountToBeExternal(
        body.data[0].accounts[0],
        mockAccountsBalanceGetResponse.accounts[0]
      );
    });
  });
});
