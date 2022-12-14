import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);
let accessToken: string;
describe('Test user end point and controller', () => {
  it('test register user', async () => {
    const { body, status } = await request
      .post('/user/register')
      .set('Content-type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        firstname: 'toto',
        lastname: 'shalash',
        password: 'testtest',
      });
    expect(status).toBe(200);
  });
  it('test register user2 without password', async () => {
    const { body, status } = await request
      .post('/user/register')
      .set('Content-type', 'application/json')
      .send({
        firstname: 'muhammed',
        lastname: 'ashraf',
      });
    expect(status).toBe(400);
  });
  it('test auth login', async () => {
    const { body, status } = await request
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({
        firstname: 'toto',
        lastname: 'shalash',
        password: 'testtest',
      });
    accessToken = body.accessToken;
    expect(status).toEqual(200);
  });
  it('test user update', async () => {
    const response = await request
      .put('/user/update')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + accessToken)
      .send({
        firstname: 'mohammed',
        lastname: 'shalash',
        password: 'testtest',
      });
    console.log(accessToken);
    expect(response.status).toBe(200);
  });
  it('test user show my data', async () => {
    const response = await request
      .get('/user/showme')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + accessToken)
      .send();
    expect(response.status).toBe(200);
  });
  it('test user delete', async () => {
    const response = await request
      .delete('/user/delete')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + accessToken)
      .send();
    expect(response.status).toBe(200);
  });
});
