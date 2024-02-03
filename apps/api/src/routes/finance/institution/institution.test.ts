import supertest from 'supertest';
import {
  Institution,
  CreateInstitutionRequest,
  SyncInstitutionsResponse,
  Account
} from '@kaizen/finance';
import { ApiSuccessResponse, ErrorKey } from '@kaizen/core';
import {
  buildAccount,
  buildAccountsBalanceGetResponse,
  buildItem,
  createAndLoginUser,
  createInstitution,
  expectError
} from '../../../../test';
import { buildSut } from '../../../../test/build-sut';
import { AccountBase } from 'plaid';

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
  describe('sync should', () => {
    it('returns empty array when no institutions exist', async () => {
      // Arrange
      const { sut } = buildSut();
      const { authToken } = await createAndLoginUser(sut);

      // Act
      const response = await supertest(sut)
        .put('/institution/sync')
        .auth(authToken.accessToken, { type: 'bearer' });
      const body: ApiSuccessResponse<SyncInstitutionsResponse> = response.body;

      // Assert
      expect(response.statusCode).toBe(200);
      expect(body.data.succeeded.length).toBe(0);
      expect(body.data.failed.length).toBe(0);
    });
    it('returns created account when new accounts exist', async () => {
      // Arrange
      const item = buildItem();
      const originalExternal = buildAccount({ item_id: item.item_id });
      const accountsBalanceGetResponse = buildAccountsBalanceGetResponse({
        accounts: [originalExternal],
        item
      });
      let { sut } = buildSut({
        accountsBalanceGetResponse: accountsBalanceGetResponse
      });
      const { authToken } = await createInstitution(sut);
      const createdExternal = buildAccount({ item_id: item.item_id });
      sut = buildSut({
        accountsBalanceGetResponse: {
          ...accountsBalanceGetResponse,
          accounts: [originalExternal, createdExternal]
        }
      }).sut;

      // Act
      const response = await supertest(sut)
        .put('/institution/sync')
        .auth(authToken.accessToken, { type: 'bearer' });
      const body: ApiSuccessResponse<SyncInstitutionsResponse> = response.body;

      // Assert
      expect(response.statusCode).toBe(200);
      expect(body.data.succeeded.length).toBe(1);
      const syncedInstitution = body.data.succeeded[0];
      expect(syncedInstitution.id).toBe(syncedInstitution.id);
      expect(syncedInstitution.accounts.length).toBe(2);
      const originalAccount = syncedInstitution.accounts.find(
        (account) => account.externalId === originalExternal.account_id
      );
      expect(originalAccount).toBeDefined();
      if (originalAccount) {
        expectAccountToBeExternal(originalAccount, originalExternal);
      }
      const createdAccount = syncedInstitution.accounts.find(
        (account) => account.externalId === createdExternal.account_id
      );
      expect(createdAccount).toBeDefined();
      if (createdAccount) {
        expectAccountToBeExternal(createdAccount, createdExternal);
      }
    });
    it('returns updated account when new accounts exist', async () => {
      // Arrange
      const item = buildItem();
      const originalExternal = buildAccount({ item_id: item.item_id });
      const accountsBalanceGetResponse = buildAccountsBalanceGetResponse({
        accounts: [originalExternal],
        item
      });
      let { sut } = buildSut({
        accountsBalanceGetResponse: accountsBalanceGetResponse
      });
      const { authToken } = await createInstitution(sut);
      const updatedExternal: AccountBase = {
        ...originalExternal,
        balances: {
          ...originalExternal.balances,
          available: 77,
          current: 7,
          iso_currency_code: 'EUR'
        }
      };
      sut = buildSut({
        accountsBalanceGetResponse: {
          ...accountsBalanceGetResponse,
          accounts: [updatedExternal]
        }
      }).sut;

      // Act
      const response = await supertest(sut)
        .put('/institution/sync')
        .auth(authToken.accessToken, { type: 'bearer' });
      const body: ApiSuccessResponse<SyncInstitutionsResponse> = response.body;

      // Assert
      expect(response.statusCode).toBe(200);
      expect(body.data.succeeded.length).toBe(1);
      const syncedInstitution = body.data.succeeded[0];
      expect(syncedInstitution.id).toBe(syncedInstitution.id);
      expect(syncedInstitution.accounts.length).toBe(1);
      const updatedAccount = syncedInstitution.accounts.find(
        (account) => account.externalId === originalExternal.account_id
      );
      expect(updatedAccount).toBeDefined();
      if (updatedAccount) {
        expectAccountToBeExternal(updatedAccount, updatedExternal);
      }
    });
  });
});

const expectAccountToBeExternal = (actual: Account, expected: AccountBase) => {
  expect(actual.id).toBeDefined();
  expect(actual.externalId).toBe(expected.account_id);
  expect(actual.type).toBe(expected.type);
  expect(actual.currency).toBe(expected.balances.iso_currency_code);
  expect(actual.available).toBe(expected.balances.available);
  expect(actual.current).toBe(expected.balances.current);
};
