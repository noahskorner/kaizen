import supertest from 'supertest';
import { app } from '../../../app';
import {
  createAndLoginUser,
  createInstitution,
  expectError
} from '../../../fixtures';
import {
  ApiSuccessResponse,
  DEFAULT_PAGE_SIZE,
  ErrorKey,
  Paginated,
  toSearchParams
} from '@kaizen/core';
import { FindTransactionsRequest, Transaction } from '@kaizen/finance';

describe('/finance/transaction', () => {
  describe('find should', () => {
    it('returns 400 when page not provided', async () => {
      // Arrange
      const { authToken } = await createAndLoginUser();

      // Act
      const response = await supertest(app)
        .get('/finance/transaction')
        .auth(authToken.accessToken, { type: 'bearer' });

      // Asserts
      expect(response.status).toBe(400);
      expectError(response, ErrorKey.FIND_TRANSACTIONS_INVALID_PAGE);
    });
    it('returns 400 when page not valid', async () => {
      // Arrange
      const { authToken } = await createAndLoginUser();
      const request: FindTransactionsRequest = {
        page: 0
      };

      // Act
      const response = await supertest(app)
        .get(`/finance/transaction?${toSearchParams(request)}`)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Asserts
      expect(response.status).toBe(400);
      expectError(response, ErrorKey.FIND_TRANSACTIONS_INVALID_PAGE);
    });
    it('returns 400 when pageSize not valid', async () => {
      // Arrange
      const { authToken } = await createAndLoginUser();
      const request: Omit<FindTransactionsRequest, 'pageSize'> & {
        pageSize: null;
      } = {
        page: 1,
        pageSize: null
      };

      // Act
      const response = await supertest(app)
        .get(`/finance/transaction?${toSearchParams(request)}`)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Asserts
      expect(response.status).toBe(400);
      expectError(response, ErrorKey.FIND_TRANSACTIONS_INVALID_PAGE_SIZE);
    });
    it('returns 200 and default page size when no page size provided', async () => {
      // Arrange
      const { authToken } = await createInstitution();
      const request: FindTransactionsRequest = {
        page: 1
      };

      // Act
      const response = await supertest(app)
        .get(`/finance/transaction?${toSearchParams(request)}`)
        .auth(authToken.accessToken, { type: 'bearer' });
      const body: ApiSuccessResponse<Paginated<Transaction>> = response.body;

      // Asserts
      expect(response.status).toBe(200);
      expect(body.data.hits.length).toBe(DEFAULT_PAGE_SIZE);
      expect(body.data.total).toBe(15);
    });
    it('returns 200 and custom page size', async () => {
      // Arrange
      const { authToken } = await createInstitution();
      const pageSize = 7;
      const request: FindTransactionsRequest = {
        page: 1,
        pageSize: pageSize
      };

      // Act
      const response = await supertest(app)
        .get(`/finance/transaction?${toSearchParams(request)}`)
        .auth(authToken.accessToken, { type: 'bearer' });
      const body: ApiSuccessResponse<Paginated<Transaction>> = response.body;

      // Asserts
      expect(response.status).toBe(200);
      expect(body.data.hits.length).toBe(pageSize);
      expect(body.data.total).toBe(15);
    });
    it('returns ordered by authorizedDate', async () => {
      // Arrange
      const { authToken } = await createInstitution();
      const request: FindTransactionsRequest = {
        page: 1,
        pageSize: 15
      };

      // Act
      const response = await supertest(app)
        .get(`/finance/transaction?${toSearchParams(request)}`)
        .auth(authToken.accessToken, { type: 'bearer' });
      const body: ApiSuccessResponse<Paginated<Transaction>> = response.body;

      // Asserts
      expect(response.status).toBe(200);
      expect(body.data.total).toBe(15);
      expect(body.data.hits.length).toBe(15);
      const sortedHits = [...body.data.hits].sort((a, b) => {
        if (a.date == null) return -1;
        if (b.date == null) return 1;

        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      expect(body.data.hits).toEqual(sortedHits);
    });
  });
});
