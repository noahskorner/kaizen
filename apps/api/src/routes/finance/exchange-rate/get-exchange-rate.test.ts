import supertest from 'supertest';
import {
  buildTestBed,
  cachedPrismaClient
} from '../../../../test/build-test-bed';
import { createAndLoginUser } from '../../../../test/create-and-login-user';
import {
  ErrorCode,
  GetExchangeRateRequestFailedError,
  ServiceResponse,
  ServiceSuccessResponse
} from '@kaizen/core';
import { expectError } from '../../../../test/expect-error';
import {
  ExchangeRate,
  ExternalExchangeRate,
  IExchangeRateProvider
} from '@kaizen/finance';
import { ServiceCollectionBuilder } from '../../../service-collection.builder';
import { AppBuilder } from '../../../app-builder';

describe('/exchange-rate/:base', () => {
  describe('get should', () => {
    beforeEach(async () => {
      await cachedPrismaClient.exchangeRateRecord.deleteMany();
    });
    it('returns 404 when base currency is invalid', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { authToken } = await createAndLoginUser(testBed);

      // Act
      const response = await supertest(testBed)
        .get('/exchange-rate/INVALID_CURRENCY')
        .auth(authToken.accessToken, { type: 'bearer' });

      // Asserts
      expect(response.status).toBe(404);
      expectError(response, ErrorCode.GET_EXCHANGE_RATE_INVALID_CURRENCY);
    });
    it('returns 500 when exchange rate provider fails', async () => {
      // Arrange
      const mockExchangeRateProvider: IExchangeRateProvider = {
        get: jest.fn().mockResolvedValue({
          type: 'FAILURE',
          errors: [
            {
              code: ErrorCode.GET_EXCHANGE_RATE_REQUEST_FAILED,
              params: {
                error: {}
              }
            } satisfies GetExchangeRateRequestFailedError
          ]
        })
      };
      const mockServiceCollection = new ServiceCollectionBuilder()
        .withExchangeRateProvider(mockExchangeRateProvider)
        .build();
      const testBed = new AppBuilder()
        .withServiceCollection(mockServiceCollection)
        .build();
      const { authToken } = await createAndLoginUser(testBed);

      // Act
      const response = await supertest(testBed)
        .get('/exchange-rate/USD')
        .auth(authToken.accessToken, { type: 'bearer' });

      // Asserts
      expect(response.status).toBe(500);
      expectError(response, ErrorCode.GET_EXCHANGE_RATE_REQUEST_FAILED);
    });
    it('returns 200 and latest exchange rates', async () => {
      // Arrange
      const mockExchangeRate: ExternalExchangeRate = {
        base: 'USD',
        rates: {
          EUR: 0.85
        }
      };
      const mockExchangeRateProvider: IExchangeRateProvider = {
        get: jest.fn().mockResolvedValue({
          type: 'SUCCESS',
          data: mockExchangeRate
        })
      };
      const mockServiceCollection = new ServiceCollectionBuilder()
        .withExchangeRateProvider(mockExchangeRateProvider)
        .build();
      const testBed = new AppBuilder()
        .withServiceCollection(mockServiceCollection)
        .build();
      const { authToken } = await createAndLoginUser(testBed);

      // Act
      const response = await supertest(testBed)
        .get('/exchange-rate/USD')
        .auth(authToken.accessToken, { type: 'bearer' });
      const body = response.body as ServiceResponse<ExchangeRate>;

      // Asserts
      expect(response.status).toBe(200);
      expect(body.type).toEqual('SUCCESS');
      if (body.type === 'SUCCESS') {
        expect(body.data.base).toEqual(mockExchangeRate.base);
        expect(body.data.rates).toEqual(mockExchangeRate.rates);
      }
    });
    it('returns cached exchange rates when updated less than 1 hour ago', async () => {
      // Arrange
      const mockExchangeRate: ExternalExchangeRate = {
        base: 'USD',
        rates: {
          EUR: 0.85
        }
      };
      const mockExchangeRateProvider: IExchangeRateProvider = {
        get: jest
          .fn()
          .mockResolvedValueOnce({
            type: 'SUCCESS',
            data: mockExchangeRate
          })
          .mockResolvedValueOnce({
            type: 'SUCCESS',
            data: { ...mockExchangeRate, EUR: 0.86 }
          })
      };
      const mockServiceCollection = new ServiceCollectionBuilder()
        .withExchangeRateProvider(mockExchangeRateProvider)
        .build();
      const testBed = new AppBuilder()
        .withServiceCollection(mockServiceCollection)
        .build();
      const { authToken } = await createAndLoginUser(testBed);

      // Act
      await supertest(testBed)
        .get('/exchange-rate/USD')
        .auth(authToken.accessToken, { type: 'bearer' });
      const response = await supertest(testBed)
        .get('/exchange-rate/USD')
        .auth(authToken.accessToken, { type: 'bearer' });
      const body = response.body as ServiceResponse<ExchangeRate>;

      // Asserts
      expect(response.status).toBe(200);
      expect(body.type).toEqual('SUCCESS');
      if (body.type === 'SUCCESS') {
        expect(body.data.base).toEqual(mockExchangeRate.base);
        expect(body.data.rates).toEqual(mockExchangeRate.rates);
      }
    });
    it('returns updated exchange rates when stale for an hour', async () => {
      // Arrange
      const mockExchangeRate: ExternalExchangeRate = {
        base: 'USD',
        rates: {
          EUR: 0.85
        }
      };
      const mockUpdatedExchangeRate: ExternalExchangeRate = {
        ...mockExchangeRate,
        rates: {
          EUR: 0.86
        }
      };
      const mockExchangeRateProvider: IExchangeRateProvider = {
        get: jest
          .fn()
          .mockResolvedValueOnce({
            type: 'SUCCESS',
            data: mockExchangeRate
          })
          .mockResolvedValueOnce({
            type: 'SUCCESS',
            data: mockUpdatedExchangeRate
          })
      };
      const mockServiceCollection = new ServiceCollectionBuilder()
        .withExchangeRateProvider(mockExchangeRateProvider)
        .build();
      const testBed = new AppBuilder()
        .withServiceCollection(mockServiceCollection)
        .build();
      const { authToken } = await createAndLoginUser(testBed);
      const originalResponse = await supertest(testBed)
        .get('/exchange-rate/USD')
        .auth(authToken.accessToken, { type: 'bearer' });
      const originalBody =
        originalResponse.body as ServiceSuccessResponse<ExchangeRate>;
      mockServiceCollection.prisma.exchangeRateRecord.update({
        where: {
          id: originalBody.data.id
        },
        data: {
          updatedAt: new Date(Date.now() - 60 * 60 * 1000)
        }
      });

      // Act
      const response = await supertest(testBed)
        .get('/exchange-rate/USD')
        .auth(authToken.accessToken, { type: 'bearer' });
      const body = response.body as ServiceResponse<ExchangeRate>;

      // Asserts
      expect(response.status).toBe(200);
      expect(body.type).toEqual('SUCCESS');
      if (body.type === 'SUCCESS') {
        expect(body.data.base).toEqual(mockUpdatedExchangeRate.base);
        expect(body.data.rates).toEqual(mockUpdatedExchangeRate.rates);
      }
    });
  });
});
