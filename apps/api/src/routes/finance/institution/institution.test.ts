import supertest from 'supertest';
import {
  Institution,
  CreateInstitutionRequest,
  SyncInstitutionsResponse
} from '@kaizen/finance';
import { ApiSuccessResponse, ErrorCode } from '@kaizen/core';
import {
  buildAccount,
  buildAccountsBalanceGetResponse,
  buildItem,
  createAndLoginUser,
  createInstitution,
  expectAccountToBeExternal,
  expectError
} from '../../../../test';
import { buildTestBed } from '../../../../test/build-test-bed';
import { AccountBase } from 'plaid';
import {
  ServiceEventType,
  SyncAccountsSuccessEvent
} from '@kaizen/core-server';

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
  describe('sync should', () => {
    it('returns 200 and empty array when no institutions exist', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { authToken } = await createAndLoginUser(testBed);

      // Act
      const response = await supertest(testBed)
        .put('/institution/sync')
        .auth(authToken.accessToken, { type: 'bearer' });
      const body: ApiSuccessResponse<SyncInstitutionsResponse> = response.body;

      // Assert
      expect(response.statusCode).toBe(200);
      expect(body.data.succeeded.length).toBe(0);
      expect(body.data.failed.length).toBe(0);
    });
    it('returns 200 and created account when new accounts exist', async () => {
      // Arrange
      const item = buildItem();
      const originalExternal = buildAccount({ item_id: item.item_id });
      const accountsBalanceGetResponse = buildAccountsBalanceGetResponse({
        accounts: [originalExternal],
        item
      });
      let { testBed } = buildTestBed({
        accountsBalanceGetResponse: accountsBalanceGetResponse
      });
      const { authToken } = await createInstitution(testBed);
      const createdExternal = buildAccount({ item_id: item.item_id });
      testBed = buildTestBed({
        accountsBalanceGetResponse: {
          ...accountsBalanceGetResponse,
          accounts: [originalExternal, createdExternal]
        }
      }).testBed;

      // Act
      const response = await supertest(testBed)
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
    it('returns 200 and updated account when new accounts exist', async () => {
      // Arrange
      const item = buildItem();
      const originalExternal = buildAccount({ item_id: item.item_id });
      const accountsBalanceGetResponse = buildAccountsBalanceGetResponse({
        accounts: [originalExternal],
        item
      });
      let { testBed } = buildTestBed({
        accountsBalanceGetResponse: accountsBalanceGetResponse
      });
      const { authToken } = await createInstitution(testBed);
      const updatedExternal: AccountBase = {
        ...originalExternal,
        balances: {
          ...originalExternal.balances,
          available: 77,
          current: 7,
          iso_currency_code: 'EUR'
        }
      };
      testBed = buildTestBed({
        accountsBalanceGetResponse: {
          ...accountsBalanceGetResponse,
          accounts: [updatedExternal]
        }
      }).testBed;

      // Act
      const response = await supertest(testBed)
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
    it(`emits ${ServiceEventType.SYNC_ACCOUNTS_SUCCESS} event`, async () => {
      // Arrange
      const { serviceEventBus, testBed } = buildTestBed();
      const spy = jest.spyOn(serviceEventBus, 'publish');
      const { authToken, user } = await createAndLoginUser(testBed);
      const expected: SyncAccountsSuccessEvent = {
        type: ServiceEventType.SYNC_ACCOUNTS_SUCCESS,
        payload: {
          userId: user.id
        }
      };

      // Act
      await supertest(testBed)
        .put('/institution/sync')
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(spy).toHaveBeenCalledWith(expected);
    });
  });
});
