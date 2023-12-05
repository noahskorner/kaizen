import supertest from 'supertest';
import { Account, CreateAccountRequest } from '@kaizen/account';
import { app } from '../../app';
import { expectError, createAccount, createAndLoginUser } from '../../fixtures';
import { ErrorKey } from '@kaizen/core';

describe('/account', () => {
  describe('create should', () => {
    it('returns 400 when no publicToken is provided', async () => {
      // Arrange
      const { authToken } = await createAndLoginUser();

      // Act
      const response = await supertest(app)
        .post('/account')
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.statusCode).toBe(400);
      expectError(response, ErrorKey.CREATE_ACCOUNT_INVALID_PLAID_PUBLIC_TOKEN);
    });
    it('returns 400 when publicToken is empty string', async () => {
      // Arrange
      const { authToken } = await createAndLoginUser();
      const request: CreateAccountRequest = {
        publicToken: ''
      };

      // Act
      const response = await supertest(app)
        .post('/account')
        .send(request)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.statusCode).toBe(400);
      expectError(response, ErrorKey.CREATE_ACCOUNT_INVALID_PLAID_PUBLIC_TOKEN);
    });
    it('returns 201 and created account', async () => {
      // Arrange
      const { authToken } = await createAndLoginUser();
      const request: CreateAccountRequest = {
        publicToken: 'TEST_PLAID_PUBLIC_TOKEN'
      };

      // Act
      const response = await supertest(app)
        .post('/account')
        .send(request)
        .auth(authToken.accessToken, { type: 'bearer' });
      const account: Account = response.body;

      // Assert
      expect(response.statusCode).toBe(201);
      expect(account.id).toBeDefined();
    });
  });
  describe('find should', () => {
    it('returns 401 when user is not logged in', async () => {
      // Act
      const response = await supertest(app).get('/account');

      // Assert
      expect(response.statusCode).toBe(401);
    });
    it('returns empty array when no accounts exist', async () => {
      // Arrange
      const { authToken } = await createAndLoginUser();

      // Act
      const response = await supertest(app)
        .get('/account')
        .auth(authToken.accessToken, { type: 'bearer' });
      const body = response.body as Account[];

      // Assert
      expect(response.statusCode).toBe(200);
      expect(body.length).toBe(0);
    });
    it('returns list with created account', async () => {
      // Arrange
      const { authToken, account } = await createAccount();

      // Act
      const response = await supertest(app)
        .get('/account')
        .auth(authToken.accessToken, { type: 'bearer' });
      const body = response.body as Account[];

      // Assert
      expect(response.statusCode).toBe(200);
      expect(body.length).toBe(1);
      expect(body[0].id).toBe(account.id);
      expect(body[0].userId).toBe(account.userId);
    });
  });
});
