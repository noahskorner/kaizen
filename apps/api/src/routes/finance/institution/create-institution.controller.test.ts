import supertest from 'supertest';
import { Institution, CreateInstitutionRequest } from '@kaizen/finance';
import { ApiSuccessResponse, ErrorCode } from '@kaizen/core';
import {
  createAndLoginUser,
  expectAccountToBeExternal,
  expectError
} from '../../../../test';
import { buildTestBed } from '../../../../test/build-test-bed';

describe('/institution', () => {
  describe('create should', () => {
    it('returns 400 when no publicToken is provided', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { authToken } = await createAndLoginUser(testBed);

      // Act
      const response = await supertest(testBed)
        .post('/institution')
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.statusCode).toBe(400);
      expectError(
        response,
        ErrorCode.CREATE_ACCOUNT_INVALID_PLAID_PUBLIC_TOKEN
      );
    });
    it('returns 400 when publicToken is empty string', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { authToken } = await createAndLoginUser(testBed);
      const request: CreateInstitutionRequest = {
        publicToken: ''
      };

      // Act
      const response = await supertest(testBed)
        .post('/institution')
        .send(request)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.statusCode).toBe(400);
      expectError(
        response,
        ErrorCode.CREATE_ACCOUNT_INVALID_PLAID_PUBLIC_TOKEN
      );
    });
    it('returns 201 and created institution', async () => {
      // Arrange
      const {
        mockItemPublicTokenExchangeResponse,
        mockAccountsBalanceGetResponse,
        testBed
      } = buildTestBed();
      const { authToken, user } = await createAndLoginUser(testBed);
      const request: CreateInstitutionRequest = {
        publicToken: mockItemPublicTokenExchangeResponse.access_token
      };

      // Act
      const response = await supertest(testBed)
        .post('/institution')
        .send(request)
        .auth(authToken.accessToken, { type: 'bearer' });
      const body: ApiSuccessResponse<Institution> = response.body;

      // Assert
      expect(response.statusCode).toBe(201);
      expect(body.data.id).toBeDefined();
      expect(body.data.userId).toBe(user.id);
      expectAccountToBeExternal(
        body.data.accounts[0],
        mockAccountsBalanceGetResponse.accounts[0]
      );
    });
  });
});
