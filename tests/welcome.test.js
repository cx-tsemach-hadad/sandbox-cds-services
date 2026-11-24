const request = require('supertest');

const app = require('../index.js');

describe('Welcome Page', () => {
  test('GET with a name should respond with a 200 and greet that name', (done) => {
    request(app).get('/welcome?name=Alice').then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toMatch(/text\/html/);
      expect(response.text).toContain('Welcome Alice');
      done();
    });
  });

  test('GET without a name should greet a guest', (done) => {
    request(app).get('/welcome').then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.text).toContain('Welcome guest');
      done();
    });
  });
});
