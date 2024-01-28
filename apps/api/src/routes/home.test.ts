import supertest from 'supertest';
import { defaultTestBed } from '../../test';

describe('/', () => {
  describe('find should', () => {
    it('returns 200', async () => {
      // Act
      const response = await supertest(defaultTestBed).get('/').send();

      // Assert
      expect(response.statusCode).toBe(200);
    });
  });
});
