import AppServer from '../../server';
import request from 'supertest';

describe('Server Test Suite', () => {
  it('Should be up', async () => {
    const response = await request(AppServer).get('/');

    expect(response.status).toBe(200);
    expect(response.status).not.toBe(500);
  });
});
