import supertest from 'supertest';
import {
  Institution,
  CreateInstitutionRequest,
  AccountType
} from '@kaizen/institution';
import { app } from '../../app';
import {
  expectError,
  createInstitution,
  createAndLoginUser
} from '../../fixtures';
import { ErrorKey } from '@kaizen/core';

describe('/institution', () => {
  describe('create should', () => {
    it('returns 400 when no publicToken is provided', async () => {
      // Arrange
      const { authToken } = await createAndLoginUser();

      // Act
      const response = await supertest(app)
        .post('/institution')
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.statusCode).toBe(400);
      expectError(response, ErrorKey.CREATE_ACCOUNT_INVALID_PLAID_PUBLIC_TOKEN);
    });
    it('returns 400 when publicToken is empty string', async () => {
      // Arrange
      const { authToken } = await createAndLoginUser();
      const request: CreateInstitutionRequest = {
        publicToken: ''
      };

      // Act
      const response = await supertest(app)
        .post('/institution')
        .send(request)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.statusCode).toBe(400);
      expectError(response, ErrorKey.CREATE_ACCOUNT_INVALID_PLAID_PUBLIC_TOKEN);
    });
    it.only('returns 201 and created institution', async () => {
      // Arrange
      const { authToken, user } = await createAndLoginUser();
      const request: CreateInstitutionRequest = {
        publicToken: 'TEST_PLAID_PUBLIC_TOKEN'
      };

      // Act
      const response = await supertest(app)
        .post('/institution')
        .send(request)
        .auth(authToken.accessToken, { type: 'bearer' });
      const institution: Institution = response.body;

      // Assert
      expect(response.statusCode).toBe(201);
      expect(institution.id).toBeDefined();
      expect(institution.userId).toBe(user.id);
      expect(institution.accounts[0].externalId).toBe(
        'MOCK_EXTERNAL_ACCOUNT_ID'
      );
      expect(institution.accounts[0].balance.current).toBe(100);
      expect(institution.accounts[0].balance.available).toBe(75);
      expect(institution.accounts[0].type).toBe(AccountType.Depository);
    });
  });
  describe('find should', () => {
    it('returns 401 when user is not logged in', async () => {
      // Act
      const response = await supertest(app).get('/institution');

      // Assert
      expect(response.statusCode).toBe(401);
    });
    it('returns empty array when no institutions exist', async () => {
      // Arrange
      const { authToken } = await createAndLoginUser();

      // Act
      const response = await supertest(app)
        .get('/institution')
        .auth(authToken.accessToken, { type: 'bearer' });
      const body = response.body as Institution[];

      // Assert
      expect(response.statusCode).toBe(200);
      expect(body.length).toBe(0);
    });
    it('returns list with created institution', async () => {
      // Arrange
      const { authToken, institution } = await createInstitution();

      // Act
      const response = await supertest(app)
        .get('/institution')
        .auth(authToken.accessToken, { type: 'bearer' });
      const body = response.body as Institution[];

      // Assert
      expect(response.statusCode).toBe(200);
      expect(body.length).toBe(1);
      expect(body[0].id).toBe(institution.id);
      expect(body[0].userId).toBe(institution.userId);
      expect(body[0].accounts[0].externalId).toBe('MOCK_EXTERNAL_ACCOUNT_ID');
      expect(body[0].accounts[0].balance.current).toBe(100);
      expect(body[0].accounts[0].balance.available).toBe(75);
      expect(body[0].accounts[0].type).toBe(AccountType.Depository);
    });
  });
});
