import {
  CreateVirtualAccountRequest,
  VirtualAccount,
  VirtualAccountFrequency
} from '@kaizen/finance';
import { createAndLoginUser } from '../../../fixtures/create-and-login-user';
import { createVirtualAccount } from '../../../fixtures/create-virtual-account';
import { expectValidDate } from '../../../fixtures/expect-valid-date';
import supertest from 'supertest';
import { app } from '../../../app';
import { ApiSuccessResponse, ErrorKey } from '@kaizen/core';
import { expectError } from '../../../fixtures/expect-error';

describe('/virtual-account', () => {
  describe('create should', () => {
    it('returns 400 when name is not provided', async () => {
      // Arrange
      const { authToken } = await createAndLoginUser();
      const request: Omit<
        CreateVirtualAccountRequest,
        'name' | 'balance' | 'amount' | 'frequency'
      > = {};

      // Act
      const response = await supertest(app)
        .post('/virtual-account')
        .send(request)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.status).toEqual(400);
      expectError(response, ErrorKey.CREATE_VIRTUAL_ACCOUNT_INVALID_NAME);
    });
    it('returns 400 when name is empty string', async () => {
      // Arrange
      const { authToken } = await createAndLoginUser();
      const request: Omit<
        CreateVirtualAccountRequest,
        'balance' | 'amount' | 'frequency'
      > = { name: ' ' };

      // Act
      const response = await supertest(app)
        .post('/virtual-account')
        .send(request)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.status).toEqual(400);
      expectError(response, ErrorKey.CREATE_VIRTUAL_ACCOUNT_INVALID_NAME);
    });
    it('returns 400 when balance is not provided', async () => {
      // Arrange
      const { authToken } = await createAndLoginUser();
      const request: Omit<
        CreateVirtualAccountRequest,
        'balance' | 'amount' | 'frequency'
      > = {
        name: 'Test Virtual Account'
      };

      // Act
      const response = await supertest(app)
        .post('/virtual-account')
        .send(request)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.status).toEqual(400);
      expectError(response, ErrorKey.CREATE_VIRTUAL_ACCOUNT_INVALID_BALANCE);
    });
    it('returns 400 when balance is not a number', async () => {
      // Arrange
      const { authToken } = await createAndLoginUser();
      const request: Omit<
        CreateVirtualAccountRequest,
        'balance' | 'amount' | 'frequency'
      > & { balance: string } = {
        name: 'Test Virtual Account',
        balance: 'not a number'
      };

      // Act
      const response = await supertest(app)
        .post('/virtual-account')
        .send(request)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.status).toEqual(400);
      expectError(response, ErrorKey.CREATE_VIRTUAL_ACCOUNT_INVALID_BALANCE);
    });
    it('returns 400 when balance is not a positive number', async () => {
      // Arrange
      const { authToken } = await createAndLoginUser();
      const request: Omit<CreateVirtualAccountRequest, 'amount' | 'frequency'> =
        {
          name: 'Test Virtual Account',
          balance: -1
        };

      // Act
      const response = await supertest(app)
        .post('/virtual-account')
        .send(request)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.status).toEqual(400);
      expectError(response, ErrorKey.CREATE_VIRTUAL_ACCOUNT_INVALID_BALANCE);
    });
    it('returns 400 when amount is not provided', async () => {
      // Arrange
      const { authToken } = await createAndLoginUser();
      const request: Omit<CreateVirtualAccountRequest, 'amount' | 'frequency'> =
        { name: 'Test Virtual Account', balance: 0 };

      // Act
      const response = await supertest(app)
        .post('/virtual-account')
        .send(request)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.status).toEqual(400);
      expectError(response, ErrorKey.CREATE_VIRTUAL_ACCOUNT_INVALID_AMOUNT);
    });
    it('returns 400 when amount is not a number', async () => {
      // Arrange
      const { authToken } = await createAndLoginUser();
      const request: Omit<
        CreateVirtualAccountRequest,
        'amount' | 'frequency'
      > & { amount: string } = {
        name: 'Test Virtual Account',
        balance: 0,
        amount: 'not a number'
      };

      // Act
      const response = await supertest(app)
        .post('/virtual-account')
        .send(request)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.status).toEqual(400);
      expectError(response, ErrorKey.CREATE_VIRTUAL_ACCOUNT_INVALID_AMOUNT);
    });
    it('returns 400 when amount is not a positive number', async () => {
      // Arrange
      const { authToken } = await createAndLoginUser();
      const request: Omit<CreateVirtualAccountRequest, 'frequency'> = {
        name: 'Test Virtual Account',
        balance: 0,
        amount: -1
      };

      // Act
      const response = await supertest(app)
        .post('/virtual-account')
        .send(request)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.status).toEqual(400);
      expectError(response, ErrorKey.CREATE_VIRTUAL_ACCOUNT_INVALID_AMOUNT);
    });
    it('returns 400 when frequency is not provided', async () => {
      // Arrange
      const { authToken } = await createAndLoginUser();
      const request: Omit<CreateVirtualAccountRequest, 'frequency'> = {
        name: 'Test Virtual Account',
        balance: 0,
        amount: 0
      };

      // Act
      const response = await supertest(app)
        .post('/virtual-account')
        .send(request)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.status).toEqual(400);
      expectError(response, ErrorKey.CREATE_VIRTUAL_ACCOUNT_INVALID_FREQUENCY);
    });
    it('returns 201 and created virtual account', async () => {
      // Arrange
      const { authToken } = await createAndLoginUser();
      const request: CreateVirtualAccountRequest = {
        name: 'Test Virtual Account',
        balance: 7,
        amount: 7,
        frequency: VirtualAccountFrequency.Monthly
      };

      // Act
      const response = await supertest(app)
        .post('/virtual-account')
        .send(request)
        .auth(authToken.accessToken, { type: 'bearer' });
      const body: ApiSuccessResponse<VirtualAccount> = response.body;

      // Assert
      expect(response.status).toEqual(201);
      expect(body.data.id).toBeDefined();
      expectValidDate(body.data.createdAt);
      expect(body.data.name).toEqual(request.name);
      expect(body.data.balance).toEqual(request.balance);
      expect(body.data.amount).toEqual(request.amount);
      expect(body.data.frequency).toEqual(request.frequency);
      expect(body.data.currency).toEqual('USD');
    });
  });
  describe('find should', () => {
    it('returns 200 and empty array when no virtual accounts exist', async () => {
      // Arrange
      const { authToken } = await createAndLoginUser();

      // Act
      const response = await supertest(app)
        .get('/virtual-account')
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.status).toEqual(200);
    });
    it('returns 200 and created virtual account', async () => {
      // Arrange
      const { authToken, virtualAccount } = await createVirtualAccount();

      // Act
      const response = await supertest(app)
        .get('/virtual-account')
        .auth(authToken.accessToken, { type: 'bearer' });
      const body: ApiSuccessResponse<VirtualAccount[]> = response.body;

      // Assert
      expect(response.status).toEqual(200);
      expect(body.data.length).toEqual(1);
      expect(body.data[0].id).toEqual(virtualAccount.id);
      expectValidDate(body.data[0].createdAt);
      expect(body.data[0].name).toEqual(virtualAccount.name);
      expect(body.data[0].balance).toEqual(virtualAccount.balance);
      expect(body.data[0].amount).toEqual(virtualAccount.amount);
      expect(body.data[0].frequency).toEqual(virtualAccount.frequency);
      expect(body.data[0].currency).toEqual(virtualAccount.currency);
    });
  });
});
