const request = require('supertest');
cost app = require('../index.js');

jest.setTimeout(10000);

describe('API', () => {
  const productId = '?product_id=';
  const sort = '&sort=';
  const count = '&count';

  describe('get /questions/', () => {
    it('should return questions of the given product id', async () => {
      const res = await request(app).get(`qa/questions/${productId}1`);
      expect (res.body.product).toBe('1');
    })

    it('should return a success status code', async () => {
      const res = await request(app).get(`qa/questions/${productId}1`);
      expect (res.statusCode).toBe('200');
    })

  });
});