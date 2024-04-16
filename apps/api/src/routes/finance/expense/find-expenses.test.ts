import supertest from 'supertest';
import {
  buildTestBed,
  createAndLoginUser,
  expectError
} from '../../../../test';
import { FindExpensesRequest } from '@kaizen/finance';
import { ErrorCode, toSearchParams } from '@kaizen/core';

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
  });
});
