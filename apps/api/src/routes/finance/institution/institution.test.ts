import supertest from 'supertest';
import { Institution, CreateInstitutionRequest } from '@kaizen/finance';
import { ApiSuccessResponse, ErrorKey } from '@kaizen/core';
import { buildApp } from '../../../build-app';
import {
  MockPlaidApiBuilder,
  buildAccountsBalanceGetResponse,
  createAndLoginUser,
  createInstitution,
  expectError,
  mockItemPublicTokenExchangeResponse,
  mockLinkTokenCreateResponse
} from '../../../../test';
import { ServiceCollectionBuilder } from '../../../service-collection.builder';

describe('/institution', () => {
  const buildTestBed = () => {
    const mockAccountsGetResponse = buildAccountsBalanceGetResponse();

    const mockPlaidApi = new MockPlaidApiBuilder()
      .withLinkTokenCreate(mockLinkTokenCreateResponse)
      .withItemPublicTokenExchange(mockItemPublicTokenExchangeResponse)
      .withAccountsBalanceGet(mockAccountsGetResponse)
      .build();

    const mockServiceCollection = new ServiceCollectionBuilder()
      .withPlaidApi(mockPlaidApi)
      .build();

    const testBed = buildApp(mockServiceCollection);

    return {
      mockAccountsGetResponse,
      testBed
    };
  };

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
      expectError(response, ErrorKey.CREATE_ACCOUNT_INVALID_PLAID_PUBLIC_TOKEN);
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
      expectError(response, ErrorKey.CREATE_ACCOUNT_INVALID_PLAID_PUBLIC_TOKEN);
    });
    it('returns 201 and created institution', async () => {
      // Arrange
      const { testBed, mockAccountsGetResponse } = buildTestBed();
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
      expect(body.data.accounts[0].externalId).toBe(
        mockAccountsGetResponse.accounts[0].account_id
      );
      expect(body.data.accounts[0].current).toBe(
        mockAccountsGetResponse.accounts[0].balances.current
      );
      expect(body.data.accounts[0].available).toBe(
        mockAccountsGetResponse.accounts[0].balances.available
      );
      expect(body.data.accounts[0].currency).toBe(
        mockAccountsGetResponse.accounts[0].balances.iso_currency_code
      );
      expect(body.data.accounts[0].type).toBe(
        mockAccountsGetResponse.accounts[0].type
      );
    });
  });
  describe('find should', () => {
    it('returns 401 when user is not logged in', async () => {
      // Act
      const { testBed } = buildTestBed();
      const response = await supertest(testBed).get('/institution');

      // Assert
      expect(response.statusCode).toBe(401);
    });
    it('returns empty array when no institutions exist', async () => {
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
    it('returns list with created institution', async () => {
      // Arrange
      const { testBed, mockAccountsGetResponse } = buildTestBed();
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
      expect(body.data[0].accounts[0].externalId).toBe(
        mockAccountsGetResponse.accounts[0].account_id
      );
      expect(body.data[0].accounts[0].current).toBe(
        mockAccountsGetResponse.accounts[0].balances.current
      );
      expect(body.data[0].accounts[0].available).toBe(
        mockAccountsGetResponse.accounts[0].balances.available
      );
      expect(body.data[0].accounts[0].currency).toBe(
        mockAccountsGetResponse.accounts[0].balances.iso_currency_code
      );
      expect(body.data[0].accounts[0].type).toBe(
        mockAccountsGetResponse.accounts[0].type
      );
    });
  });
  // describe('sync should', () => {
  //   it('returns empty array when no institutions exist', async () => {
  //     // Arrange
  //     const { authToken } = await createAndLoginUser(testBed);

  //     // Act
  //     const response = await supertest(testBed)
  //       .put('/institution/sync')
  //       .auth(authToken.accessToken, { type: 'bearer' });
  //     const body: ApiSuccessResponse<Institution[]> = response.body;

  //     // Assert
  //     expect(response.statusCode).toBe(200);
  //     expect(body.data.length).toBe(0);
  //   });
  //   it('returns original accounts when none have been modified', async () => {
  //     // Arrange
  //     const { authToken, institution } = await createInstitution();
  //   });
  //   it('returns modified accounts', async () => {});
  // });
});
