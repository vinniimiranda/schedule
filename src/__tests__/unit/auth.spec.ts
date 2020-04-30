import { UserFactory } from './../../database/factories/UserFactory';
import AppServer from '../../server';
import request from 'supertest';

describe('Auth tests', () => {
  it('Shoud authenticate an user', async () => {
    const user = await new UserFactory().create();

    const response = await request(AppServer)
      .post('/auth/login')
      .send(user);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).not.toHaveProperty('password_hash');
  });

  it('Shoud return 404 when user is not found', async () => {
    const user = new UserFactory().attrs();

    const response = await request(AppServer)
      .post('/auth/login')
      .send(user);

    expect(response.status).toBe(404);
  });

  it('Shoud return 400 for invalid credentials', async () => {
    const user = await new UserFactory().create();

    const response = await request(AppServer)
      .post('/auth/login')
      .send({ ...user, password: '123456' });

    expect(response.status).toBe(400);
  });
});
