const request = require('supertest');
cost app = require('../index.js');

jest.setTimeout(10000);

describe('API', () => {
  const productId = '?product_id=';
  const sort = '&sort=';
  const count = '&count';
  const question_id = 3000;

  describe('get qa/questions/', () => {
    it('should return questions of the given product id', async () => {
      const res = await request(app).get(`qa/questions/${productId}`);
      expect (res.body.product).toBe('1');
    })

    it('should return a success status code', async () => {
      const res = await request(app).get(`qa/questions/${productId}`);
      expect (res.statusCode).toBe('200');
    })
  });

  describe('get qa/questions/:question_id/answers', () => {
    it('should return answers and phoots of the given question id', async () => {
      const res = await request(app).get(`qa/questions/${question_id}/answers`);
      expect (res.body.product).toBe('1');
    })

    it('should return a success status code', async () => {
      const res = await request(app).get(`qa/questions/${question_id}/answers`);
      expect (res.statusCode).toBe('200');
    })
  })

  describe('post qa/questions/ to be in the database after posted', () => {
    it('should save a question after it is posted', async () => {
      const req = {
        body: {
          body: 'this is a weird question',
          name: 'alfred',
          email: 'email@alfredmail.com',
        }
      }
      await request(app).post('qa/questions')
      const res =  await request(app).get('qa/questions/');
      expect res.statusCode.toBe('200');
    }
  })

  describe('post qa/questions/:question_id/answers to be in the database after posted', () => {
    it('should save an answer after it is posted', async () => {
      const req = {
        body: {
          body: 'this is a weird question',
          name: 'alfred',
          email: 'email@alfredmail.com',
        }
        params: {
          question_id: '345',
        }
      }
      await request(app).post('qa/questions')
      const res =  await request(app).get(`qa/questions/${req.params.question_id}/answers`);
      expect res.statusCode.toBe('200');
    }
  })
});