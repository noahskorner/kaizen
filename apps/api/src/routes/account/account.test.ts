import { createAndLoginUser } from '../../fixtures/create-and-login-user';
import supertest from 'supertest';
import { Account, CreateAccountRequest } from '@kaizen/account';
import { app } from '../../app';

describe('/account', () => {
  describe('create should', () => {
    it.skip('returns 400 when no plaidPublicToken is provided', async () => {
      // Arrange
      const { authToken } = await createAndLoginUser();

      // Act
      const response = await supertest(app)
        .post('/account')
        .auth(authToken.accessToken, { type: 'bearer' });
      const account: Account = response.body;

      // Assert
      expect(response.statusCode).toBe(201);
      expect(account.id).toBeDefined();
    });
    it.skip('returns 400 when plaidPublicToken is empty string', async () => {
      // Arrange
      const { authToken } = await createAndLoginUser();
      const request: CreateAccountRequest = {
        plaidPublicToken: ''
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
    it.skip('returns 201 and created account', async () => {
      // Arrange
      const { authToken } = await createAndLoginUser();
      const request: CreateAccountRequest = {
        plaidPublicToken: 'TEST_PLAID_PUBLIC_TOKEN'
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
});
