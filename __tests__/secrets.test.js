const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

describe('user routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });

  it('GET /api/v1/secrets should return a 401 if the user is not logged in', async () => {
    const resp = await request(app).get('/api/v1/secrets');
    expect(resp.status).toBe(401);
  });

  it('GET /api/v1/secrets should return a list of secrets if user is logged in', async () => {
    // use the User Service to create a new user
    const mockUser = {
      email: 'test@example.com',
      password: '12345',
    };
    await UserService.create(mockUser);
    const agent = request.agent(app);
    // log in that user
    await agent.post('/api/v1/users/sessions').send(mockUser);
    // request the secrets
    const resp = await agent.get('/api/v1/secrets');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      {
        id: expect.any(String),
        title: 'positive thoughts',
        description: 'repeat I can do this',
        createdAt: expect.any(String),
      },
      {
        id: expect.any(String),
        title: 'You wont believe me',
        description: 'Tupac is still alive',
        createdAt: expect.any(String),
      },
    ]);
  });
});
