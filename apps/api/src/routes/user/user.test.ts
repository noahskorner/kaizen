import { ErrorKey } from '@kaizen/core';
import supertest from 'supertest';
import { app } from '../../app';
import { createUniqueEmail } from '../../fixtures/create-unique-email';
import { createAndLoginUser } from '../../fixtures/create-and-login-user';
import { v4 as uuid } from 'uuid';
import { expectError } from '../../fixtures/expect-error';
import { validPassword } from '../../fixtures/valid-password';
import { CreateUserCommand } from '@kaizen/user-server';
import { User } from '@kaizen/user';
import { LinkToken } from '@kaizen/user/src/link-token';
import * as userServer from '@kaizen/user-server';
const mockUserServer = userServer;

describe('/user', () => {
  describe('create should', () => {
    it('returns 400 when request is null', async () => {
      // Act
      const response = await supertest(app).post('/user').send();

      // Assert
      expect(response.statusCode).toBe(400);
      expectError(response, ErrorKey.CREATE_USER_INVALID_EMAIL);
    });
    it('returns 400 when request is empty', async () => {
      // Arrange
      const request = {};

      // Act
      const response = await supertest(app).post('/user').send(request);

      // Assert
      expect(response.statusCode).toBe(400);
      expectError(response, ErrorKey.CREATE_USER_INVALID_EMAIL);
    });
    it('returns 400 when email is not valid', async () => {
      // Arrange
      const request = {
        email: 'invalid-email'
      };

      // Act
      const response = await supertest(app).post('/user').send(request);

      // Assert
      expect(response.statusCode).toBe(400);
      expectError(response, ErrorKey.CREATE_USER_INVALID_EMAIL);
    });
    it('returns 400 when password not provided', async () => {
      // Arrange
      const request = {
        email: createUniqueEmail()
      };

      // Act
      const response = await supertest(app).post('/user').send(request);

      // Assert
      expect(response.statusCode).toBe(400);
      expectError(response, ErrorKey.CREATE_USER_INVALID_PASSWORD);
    });
    it('returns 400 when password not long enough', async () => {
      // Arrange
      const request: CreateUserCommand = {
        email: createUniqueEmail(),
        password: '1234567'
      };

      // Act
      const response = await supertest(app).post('/user').send(request);

      // Assert
      expect(response.statusCode).toBe(400);
      expectError(response, ErrorKey.CREATE_USER_PASSWORD_TOO_SHORT);
    });
    it('returns 400 when password has no numbers', async () => {
      // Arrange
      const request: CreateUserCommand = {
        email: createUniqueEmail(),
        password: 'abcdefghi'
      };

      // Act
      const response = await supertest(app).post('/user').send(request);

      // Assert
      expect(response.statusCode).toBe(400);
      expectError(response, ErrorKey.CREATE_USER_PASSWORD_NO_NUMBER);
    });
    it('returns 400 when password has no symbols', async () => {
      // Arrange
      const request: CreateUserCommand = {
        email: createUniqueEmail(),
        password: '1234567a'
      };

      // Act
      const response = await supertest(app).post('/user').send(request);

      // Assert
      expect(response.statusCode).toBe(400);
      expectError(response, ErrorKey.CREATE_USER_PASSWORD_NO_SYMBOL);
    });
    it('returns 400 when email already exists', async () => {
      // Arrange
      const request: CreateUserCommand = {
        email: createUniqueEmail(),
        password: validPassword
      };
      await supertest(app).post('/user').send(request);

      // Act
      const response = await supertest(app).post('/user').send(request);

      // Assert
      expect(response.statusCode).toBe(400);
      expectError(response, ErrorKey.CREATE_USER_EMAIL_ALREADY_EXISTS);
    });
    it('returns 201 and user with normalized email', async () => {
      // Arrange
      const request: CreateUserCommand = {
        email: `${uuid()}-UPPERcase@test.com`,
        password: validPassword
      };

      // Act
      const response = await supertest(app).post('/user').send(request);
      const body: User = response.body;

      // Assert
      expect(response.statusCode).toBe(201);
      expect(body.email).toBe(request.email.toLowerCase());
    });
  });
  describe('createLinkToken should', () => {
    beforeAll(() => {
      jest.mock('@kaizen/user-server', () => ({
        ...mockUserServer,
        plaidClient: {
          linkTokenCreate: () => {
            return Promise.resolve({
              data: {
                link_token: 'TEST_LINK_TOKEN'
              }
            });
          }
        }
      }));
    });
    it('return 401 when user is not authenticated', async () => {
      // Act
      const response = await supertest(app).post('/user/link-token').send();

      // Assert
      expect(response.statusCode).toBe(401);
    });
    it('returns 201 and link token', async () => {
      // Arrange
      const { accessToken } = await createAndLoginUser();

      // Act
      const response = await supertest(app)
        .post('/user/link-token')
        .auth(accessToken, { type: 'bearer' });
      const linkToken = response.body as LinkToken;

      // Assert
      expect(response.statusCode).toBe(201);
      expect(linkToken.token).toBeDefined();
    });
  });
});
