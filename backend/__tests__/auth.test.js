const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/User');

describe('Auth API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await User.deleteMany();
    await mongoose.disconnect();
  });

  test('Register user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Test', email: 'test@example.com', password: '123456', role: 'ADMIN' });
    expect(res.statusCode).toBe(201);
  });

  test('Login user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: '123456' });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});