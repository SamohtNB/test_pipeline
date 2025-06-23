const request = require('supertest');
const app = require('./index'); // Assurez-vous que le chemin est correct

describe('GET /api/hello', () => {
  it('responds with json', async () => {
    const response = await request(app)
      .get('/api/hello')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.message).toBe('Hello from backend!');
  });
});

describe('POST /api/message', () => {
  it('responds with json containing the received message', async () => {
    const testMessage = 'Test message';
    const response = await request(app)
      .post('/api/message')
      .send({ userMessage: testMessage })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.serverResponse).toBe(`Le backend a reçu : ${testMessage}`);
  });
});
