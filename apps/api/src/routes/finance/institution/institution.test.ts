import supertest from 'supertest';
import { Institution, CreateInstitutionRequest } from '@kaizen/finance';
import { ApiSuccessResponse, ErrorKey } from '@kaizen/core';
import {
  createAndLoginUser,
  createInstitution,
  expectError
} from '../../../../test';
import { buildSut } from '../../../../test/test-bed.builder';

describe('/institution', () => {
  describe('create should', () => {
    it('returns 400 when no publicToken is provided', async () => {
      // Arrange
      const { sut } = buildSut();
      const { authToken } = await createAndLoginUser(sut);

      // Act
      const response = await supertest(sut)
        .post('/institution')
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.statusCode).toBe(400);
      expectError(response, ErrorKey.CREATE_ACCOUNT_INVALID_PLAID_PUBLIC_TOKEN);
    });
    it('returns 400 when publicToken is empty string', async () => {
      // Arrange
      const { sut } = buildSut();
      const { authToken } = await createAndLoginUser(sut);
      const request: CreateInstitutionRequest = {
        publicToken: ''
      };

      // Act
      const response = await supertest(sut)
        .post('/institution')
        .send(request)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.statusCode).toBe(400);
      expectError(response, ErrorKey.CREATE_ACCOUNT_INVALID_PLAID_PUBLIC_TOKEN);
    });
    it('returns 201 and created institution', async () => {
      // Arrange
      const {
        mockItemPublicTokenExchangeResponse,
        mockAccountsBalanceGetResponse,
        sut
      } = buildSut();
      const { authToken, user } = await createAndLoginUser(sut);
      const request: CreateInstitutionRequest = {
        publicToken: mockItemPublicTokenExchangeResponse.access_token
      };

      // Act
      const response = await supertest(sut)
        .post('/institution')
        .send(request)
        .auth(authToken.accessToken, { type: 'bearer' });
      const body: ApiSuccessResponse<Institution> = response.body;

      // Assert
      expect(response.statusCode).toBe(201);
      expect(body.data.id).toBeDefined();
      expect(body.data.userId).toBe(user.id);
      expect(body.data.accounts[0].externalId).toBe(
        mockAccountsBalanceGetResponse.accounts[0].account_id
      );
      expect(body.data.accounts[0].current).toBe(
        mockAccountsBalanceGetResponse.accounts[0].balances.current
      );
      expect(body.data.accounts[0].available).toBe(
        mockAccountsBalanceGetResponse.accounts[0].balances.available
      );
      expect(body.data.accounts[0].currency).toBe(
        mockAccountsBalanceGetResponse.accounts[0].balances.iso_currency_code
      );
      expect(body.data.accounts[0].type).toBe(
        mockAccountsBalanceGetResponse.accounts[0].type
      );
    });
  });
  describe('find should', () => {
    it('returns 401 when user is not logged in', async () => {
      // Act
      const { sut } = buildSut();
      const response = await supertest(sut).get('/institution');

      // Assert
      expect(response.statusCode).toBe(401);
    });
    it('returns empty array when no institutions exist', async () => {
      // Arrange
      const { sut } = buildSut();
      const { authToken } = await createAndLoginUser(sut);

      // Act
      const response = await supertest(sut)
        .get('/institution')
        .auth(authToken.accessToken, { type: 'bearer' });
      const body: ApiSuccessResponse<Institution[]> = response.body;

      // Assert
      expect(response.statusCode).toBe(200);
      expect(body.data.length).toBe(0);
    });
    it('returns list with created institution', async () => {
      // Arrange
      const { sut, mockAccountsBalanceGetResponse } = buildSut();
      const { authToken, user, institution } = await createInstitution(sut);

      // Act
      const response = await supertest(sut)
        .get('/institution')
        .auth(authToken.accessToken, { type: 'bearer' });
      const body: ApiSuccessResponse<Institution[]> = response.body;

      // Assert
      expect(response.statusCode).toBe(200);
      expect(body.data.length).toBe(1);
      expect(body.data[0].id).toBe(institution.id);
      expect(body.data[0].userId).toBe(user.id);
      expect(body.data[0].accounts[0].externalId).toBe(
        mockAccountsBalanceGetResponse.accounts[0].account_id
      );
      expect(body.data[0].accounts[0].current).toBe(
        mockAccountsBalanceGetResponse.accounts[0].balances.current
      );
      expect(body.data[0].accounts[0].available).toBe(
        mockAccountsBalanceGetResponse.accounts[0].balances.available
      );
      expect(body.data[0].accounts[0].currency).toBe(
        mockAccountsBalanceGetResponse.accounts[0].balances.iso_currency_code
      );
      expect(body.data[0].accounts[0].type).toBe(
        mockAccountsBalanceGetResponse.accounts[0].type
      );
    });
  });
});
