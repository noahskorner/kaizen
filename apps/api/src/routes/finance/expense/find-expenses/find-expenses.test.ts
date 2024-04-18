import supertest from 'supertest';
import {
  buildAccount,
  buildAccountsBalanceGetResponse,
  buildTestBed,
  buildTransaction,
  buildTransactionsSyncResponse,
  createAndLoginUser,
  createInstitution,
  expectError
} from '../../../../../test';
import { Expense, FindExpensesRequest } from '@kaizen/finance';
import { ApiResponse, ErrorCode, toSearchParams } from '@kaizen/core';
import { v4 as uuid } from 'uuid';

describe('/expense', () => {
  describe('find should', () => {
    it('returns 400 when start date not valid', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { authToken } = await createAndLoginUser(testBed);
      const request: Omit<FindExpensesRequest, 'endDate'> = {
        startDate: 'invalid'
      };

      // Act
      const response = await supertest(testBed)
        .get(`/expense?${toSearchParams(request)}`)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Asserts
      expect(response.status).toBe(400);
      expectError(response, ErrorCode.FIND_EXPENSES_INVALID_START_DATE);
    });
    it('returns 400 when end date not valid', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { authToken } = await createAndLoginUser(testBed);
      const request: FindExpensesRequest = {
        startDate: new Date().toISOString(),
        endDate: 'invalid'
      };

      // Act
      const response = await supertest(testBed)
        .get(`/expense?${toSearchParams(request)}`)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Asserts
      expect(response.status).toBe(400);
      expectError(response, ErrorCode.FIND_EXPENSES_INVALID_END_DATE);
    });
    it('returns 400 when start date after end date', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { authToken } = await createAndLoginUser(testBed);
      const request: FindExpensesRequest = {
        startDate: new Date(1998, 7, 30, 0, 0, 0, 1).toISOString(),
        endDate: new Date(1998, 7, 30, 0, 0, 0, 0).toISOString()
      };

      // Act
      const response = await supertest(testBed)
        .get(`/expense?${toSearchParams(request)}`)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Asserts
      expect(response.status).toBe(400);
      expectError(response, ErrorCode.FIND_EXPENSES_INVALID_TIMEFRAME);
    });
    it('returns 200 and empty array when no transactions exist', async () => {
      // Arrange
      const mockAccountsBalanceGetResponse = buildAccountsBalanceGetResponse({
        accounts: []
      });
      const mockTransactionSyncResponse = buildTransactionsSyncResponse({
        added: []
      });
      const { testBed } = buildTestBed({
        accountsBalanceGetResponse: mockAccountsBalanceGetResponse,
        transactionSyncResponse: mockTransactionSyncResponse
      });
      const { authToken } = await createAndLoginUser(testBed);
      const request: FindExpensesRequest = {
        startDate: new Date(1998, 7, 30, 0, 0, 0, 0).toISOString(),
        endDate: new Date(1998, 7, 30, 0, 0, 0, 1).toISOString()
      };

      // Act
      const response = await supertest(testBed)
        .get(`/expense?${toSearchParams(request)}`)
        .auth(authToken.accessToken, { type: 'bearer' });
      const body = response.body as ApiResponse<Expense[]>;

      // Asserts
      expect(response.status).toBe(200);
      expect(body.type).toBe('SUCCESS');
      if (body.type === 'SUCCESS') {
        expect(body.data).toEqual([]);
      }
    });
    it('returns 200 and expenses', async () => {
      // Arrange
      const mockCategory1 = uuid();
      const mockCategory2 = uuid();
      const mockAccountId = uuid();
      const mockAccountsBalanceGetResponse = buildAccountsBalanceGetResponse({
        accounts: [
          buildAccount({
            account_id: mockAccountId
          })
        ]
      });
      const mockTransactionSyncResponse = buildTransactionsSyncResponse({
        added: [
          buildTransaction({
            account_id: mockAccountId,
            amount: 100,
            personal_finance_category: {
              primary: mockCategory1,
              detailed: ''
            }
          }),
          buildTransaction({
            account_id: mockAccountId,
            amount: 200,
            personal_finance_category: {
              primary: mockCategory1,
              detailed: ''
            }
          }),
          buildTransaction({
            account_id: mockAccountId,
            amount: 100,
            personal_finance_category: {
              primary: mockCategory2,
              detailed: ''
            }
          })
        ]
      });
      const { testBed } = buildTestBed({
        accountsBalanceGetResponse: mockAccountsBalanceGetResponse,
        transactionSyncResponse: mockTransactionSyncResponse
      });
      const { authToken } = await createInstitution(testBed);
      const request: FindExpensesRequest = {
        startDate: new Date(1998, 7, 30, 0, 0, 0, 0).toISOString(),
        endDate: new Date(1998, 7, 30, 0, 0, 0, 1).toISOString()
      };

      // Act
      const response = await supertest(testBed)
        .get(`/expense?${toSearchParams(request)}`)
        .auth(authToken.accessToken, { type: 'bearer' });
      const body = response.body as ApiResponse<Expense[]>;

      // Assert
      expect(response.status).toBe(200);
      expect(body.type).toBe('SUCCESS');
      if (body.type === 'SUCCESS') {
        expect(body.data.length).toBe(2);
        const category1 = body.data.find((x) => x.category === mockCategory1);
        expect(category1!.category).toBe(mockCategory1);
        expect(category1!.amount).toBe(300);
        const category2 = body.data.find((x) => x.category === mockCategory2);
        expect(category2!.category).toBe(mockCategory2);
        expect(category1!.amount).toBe(category1!.amount);
      }
    });
  });
});
