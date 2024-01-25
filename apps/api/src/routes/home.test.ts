import supertest from 'supertest';
import { appFixture } from '../app.fixture';

describe('/', () => {
  describe('find should', () => {
    it('returns 200', async () => {
      // Act
      const response = await supertest(appFixture).get('/').send();

      // Assert
      expect(response.statusCode).toBe(200);
    });
  });
});
