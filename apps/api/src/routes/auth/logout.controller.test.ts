import supertest from 'supertest';
import { ServiceCollectionBuilder } from '../../service-collection.builder';
import { AppBuilder } from '../../app-builder';
import {
  defaultTestBed,
  getRefreshToken,
  createAndLoginUser
} from '../../../test';
import { environment } from '../../env/environment';

describe('/auth', () => {
  describe('logout should', () => {
    it('returns 401 when accessToken does not exist', async () => {
      // Act
      const response = await supertest(defaultTestBed).delete('/auth');

      // Assert
      expect(response.statusCode).toBe(401);
    });
    it('returns 401 when accessToken is invalid', async () => {
      // Act
      const response = await supertest(defaultTestBed)
        .delete('/auth')
        .auth('invalid-token', { type: 'bearer' });

      // Assert
      expect(response.statusCode).toBe(401);
    });
    it('returns 401 when accessToken is expired', async () => {
      // Arrange
      const mockServiceCollection = new ServiceCollectionBuilder()
        .withEnvironment({
          ...environment,
          ACCESS_TOKEN_EXPIRATION: '0s'
        })
        .build();
      const testBed = new AppBuilder()
        .withServiceCollection(mockServiceCollection)
        .build();
      const { authToken } = await createAndLoginUser(testBed);

      // Act
      const response = await supertest(testBed)
        .delete('/auth')
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.statusCode).toBe(401);
    });
    it('returns 200 when accessToken is valid', async () => {
      // Arrange
      const { authHeaders, authToken } =
        await createAndLoginUser(defaultTestBed);

      // Act
      const response = await supertest(defaultTestBed)
        .delete('/auth')
        .set('Cookie', authHeaders['set-cookie'])
        .auth(authToken.accessToken, { type: 'bearer' });
      const refreshToken = getRefreshToken(response);

      // Assert
      expect(response.statusCode).toBe(200);
      expect(refreshToken).toBeNull();
    });
  });
});
