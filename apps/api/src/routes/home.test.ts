import supertest from 'supertest';
import { defaultAppFixture } from '../app.fixture';

describe('/', () => {
  describe('find should', () => {
    it('returns 200', async () => {
      // Act
      const response = await supertest(defaultAppFixture).get('/').send();

      // Assert
      expect(response.statusCode).toBe(200);
    });
  });
});
