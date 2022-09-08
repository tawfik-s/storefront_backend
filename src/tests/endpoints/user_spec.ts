import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);
let accessToken: string;
describe('Test user end point and controller', () => {
  it('test register user', async () => {
    const response = await request
      .post('/user/register')
      .set('Content-type', 'application/json')
      .send({
        firstname: 'tawfik',
        lastname: 'shalash',
        password: 'testtest',
      });
    expect(response.status).toBe(200);
  });
  it('test register user2 without password', async () => {
    const response = await request
      .post('/user/register')
      .set('Content-type', 'application/json')
      .send({
        firstname: 'mohammed',
        lastname: 'ashraf',
      });
    expect(response.status).toBe(400);
  });
  //   it('test auth login', async () => {
  //     const response = await request
  //       .post('/auth/login')
  //       .set('Content-type', 'application/json')
  //       .send({
  //         firstname: 'tawfik',
  //         lastname: 'shalash',
  //         password: 'testtest',
  //       });
  //     accessToken = response.body.accessToken;
  //     expect(response.status).toBe(200);
  //   });
  //   it('test user update', async () => {
  //     const response = await request
  //       .post('/auth/update')
  //       .set('Content-type', 'application/json')
  //       .set({ Authorization: accessToken })
  //       .send({
  //         firstname: 'mohammed',
  //         lastname: 'shalash',
  //         password: 'testtest',
  //       });
  //     expect(response.status).toBe(200);
  //   });
});
