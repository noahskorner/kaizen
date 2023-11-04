import { AuthToken } from '@kaizen/core';
import { CreateUserCommand, ErrorKey } from '@kaizen/services';
import supertest from 'supertest';
import { app } from '../../app';
import { createUniqueEmail } from '../../fixtures/create-unique-email';
import { expectError } from '../../fixtures/expect-error';
import { getRefreshToken } from '../../fixtures/get-refresh-token';
import { validPassword } from '../../fixtures/valid-password';

describe('/auth should', () => {
  describe('login should', () => {
    it('returns 401 if request is empty', async () => {
      // Act
      const response = await supertest(app).post('/auth').send();

      // Assert
      expect(response.statusCode).toBe(401);
      expectError(response, ErrorKey.LOGIN_INCORECT_EMAIL_OR_PASSWORD);
    });
    it('returns 401 if user does not exist', async () => {
      // Arrange
      const request = {
        email: 'not-an-email'
      };

      // Act
      const response = await supertest(app).post('/auth').send(request);

      // Assert
      expect(response.statusCode).toBe(401);
      expectError(response, ErrorKey.LOGIN_INCORECT_EMAIL_OR_PASSWORD);
    });
    it('returns 401 if user exists but password not provided', async () => {
      // Arrange
      const request = {
        email: createUniqueEmail()
      };

      // Act
      const response = await supertest(app).post('/auth').send(request);

      // Assert
      expect(response.statusCode).toBe(401);
      expectError(response, ErrorKey.LOGIN_INCORECT_EMAIL_OR_PASSWORD);
    });
    it('returns 401 if user exists but password incorrect', async () => {
      // Arrange
      const email = createUniqueEmail();
      await supertest(app)
        .post('/user')
        .send({ email, password: validPassword } as CreateUserCommand);
      const request = {
        email: email,
        password: 'incorrect-password'
      };

      // Act
      const response = await supertest(app).post('/auth').send(request);

      // Assert
      expect(response.statusCode).toBe(401);
      expectError(response, ErrorKey.LOGIN_INCORECT_EMAIL_OR_PASSWORD);
    });
    it('returns 200 if user exists and password correct', async () => {
      // Arrange
      const email = createUniqueEmail();
      await supertest(app)
        .post('/user')
        .send({ email, password: validPassword } as CreateUserCommand);
      const request = {
        email: email,
        password: validPassword
      };

      // Act
      const response = await supertest(app).post('/auth').send(request);
      const body: AuthToken = response.body;
      const refreshToken = getRefreshToken(response);

      // Assert
      expect(response.statusCode).toBe(200);
      expect(body.accessToken).toBeDefined();
      expect(body.refreshToken).toBeDefined();
      expect(body.refreshToken).toBe(refreshToken);
    });
  });
});
