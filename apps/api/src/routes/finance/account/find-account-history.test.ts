import supertest from 'supertest';
import {
  ApiResponse,
  ErrorCode,
  Paginated,
  toSearchParams
} from '@kaizen/core';
import { AccountSnapshot, FindAccountHistoryRequest } from '@kaizen/finance';
import { createAndLoginUser } from '../../../../test/create-and-login-user';
import { expectError, createInstitution } from '../../../../test';
import { buildTestBed } from '../../../../test/build-test-bed';

describe('/account/history', () => {
  describe('find should', () => {
    it('returns 400 when page not provided', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { authToken } = await createAndLoginUser(testBed);

      // Act
      const response = await supertest(testBed)
        .get('/account/history')
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.status).toBe(400);
      expectError(response, ErrorCode.FIND_ACCOUNT_HISTORY_INVALID_PAGE);
    });
    it('returns 400 when page not valid', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { authToken } = await createAndLoginUser(testBed);
      const request = {
        page: 0
      };

      // Act
      const response = await supertest(testBed)
        .get(`/account/history?${toSearchParams(request)}`)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.status).toBe(400);
      expectError(response, ErrorCode.FIND_ACCOUNT_HISTORY_INVALID_PAGE);
    });
    it('returns 400 when pageSize not valid', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { authToken } = await createAndLoginUser(testBed);
      const request = {
        page: 1,
        pageSize: null
      };

      // Act
      const response = await supertest(testBed)
        .get(`/account/history?${toSearchParams(request)}`)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.status).toBe(400);
      expectError(response, ErrorCode.FIND_ACCOUNT_HISTORY_INVALID_PAGE_SIZE);
    });
    it('returns 400 when start date not valid', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { authToken } = await createInstitution(testBed);
      const request = {
        page: 1,
        startDate: 'invalid'
      };

      // Act
      const response = await supertest(testBed)
        .get(`/account/history?${toSearchParams(request)}`)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.status).toBe(400);
      expectError(response, ErrorCode.FIND_ACCOUNT_HISTORY_INVALID_START_DATE);
    });
    it('returns 400 when end date not valid', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { authToken } = await createInstitution(testBed);
      const request = {
        page: 1,
        endDate: 'invalid'
      };

      // Act
      const response = await supertest(testBed)
        .get(`/account/history?${toSearchParams(request)}`)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.status).toBe(400);
      expectError(response, ErrorCode.FIND_ACCOUNT_HISTORY_INVALID_END_DATE);
    });
    it('returns 400 when start date after end date', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { authToken } = await createInstitution(testBed);

      // Build request
      const pageSize = 1;
      const request: FindAccountHistoryRequest = {
        page: 1,
        pageSize: pageSize,
        startDate: new Date(1998, 7, 30, 0, 0, 0, 1).toISOString(),
        endDate: new Date(1998, 7, 30, 0, 0, 0, 0).toISOString()
      };

      // Act
      const response = await supertest(testBed)
        .get(`/account/history?${toSearchParams(request)}`)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.status).toBe(400);
      expectError(response, ErrorCode.FIND_ACCOUNT_HISTORY_INVALID_TIMEFRAME);
    });
    it('returns 200 and empty list when no account history', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { authToken } = await createAndLoginUser(testBed);

      // Build request
      const pageSize = 1;
      const request: FindAccountHistoryRequest = {
        page: 1,
        pageSize: pageSize,
        startDate: new Date(1998, 7, 30, 0, 0, 0).toISOString(),
        endDate: new Date(1998, 7, 31, 0, 0, 0, 0).toISOString()
      };

      // Act
      const response = await supertest(testBed)
        .get(`/account/history?${toSearchParams(request)}`)
        .auth(authToken.accessToken, { type: 'bearer' });
      const body = response.body as ApiResponse<Paginated<AccountSnapshot>>;

      // Asserts
      expect(response.status).toBe(200);
      expect(body.type).toBe('SUCCESS');
      if (body.type === 'SUCCESS') {
        expect(body.data.total).toBe(0);
        expect(body.data.hits).toEqual([]);
      }
    });
    // TODO: Write these tests. They aren't working because the accounts are snapshatted via event
    // it('returns 200 and account history', async () => {
    //   // Arrange
    //   const mockItem = buildItem();
    //   const mockAccount = buildAccount({
    //     item_id: mockItem.item_id
    //   });
    //   const { testBed } = buildTestBed({
    //     itemPublicTokenExchangeResponse: buildItemPublicTokenExchangeResponse({
    //       item_id: mockItem.item_id
    //     }),
    //     accountsBalanceGetResponse: buildAccountsBalanceGetResponse({
    //       accounts: [mockAccount]
    //     })
    //   });
    //   const { authToken } = await createInstitution(testBed);

    //   // Build request
    //   const pageSize = 1;
    //   const request: FindAccountHistoryRequest = {
    //     page: 1,
    //     pageSize: pageSize,
    //     startDate: new Date(1998, 7, 30, 0, 0, 0).toISOString(),
    //     endDate: new Date(1998, 7, 31, 0, 0, 0, 0).toISOString()
    //   };

    //   // Act
    //   const response = await supertest(testBed)
    //     .get(`/account/history?${toSearchParams(request)}`)
    //     .auth(authToken.accessToken, { type: 'bearer' });
    //   const body = response.body as ApiResponse<Paginated<AccountSnapshot>>;

    //   // Asserts
    //   expect(response.status).toBe(200);
    //   expect(body.type).toBe('SUCCESS');
    //   if (body.type === 'SUCCESS') {
    //     expect(body.data.total).toBe(1);
    //     expectAccountSnapshotToBeExternal(body.data.hits[0], mockAccount);
    //   }
    // });
  });
});
