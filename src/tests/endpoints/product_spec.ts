import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);
let accessToken: string;
let product_id: number;
describe('Test product end points and controller', () => {
  it('test register user', async () => {
    const { body, status } = await request
      .post('/user/register')
      .set('Content-type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        firstname: 'tawfeek',
        lastname: 'shalash',
        password: 'testtest',
      });
    expect(status).toBe(200);
  });
  it('test auth login', async () => {
    const { body, status } = await request
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({
        firstname: 'tawfeek',
        lastname: 'shalash',
        password: 'testtest',
      });
    accessToken = body.accessToken;
    expect(status).toEqual(200);
  });
  it('test add product', async () => {
    const response = await request
      .post('/product/create')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + accessToken)
      .send({
        product_name: 'watch',
        product_price: 1000,
      });
    product_id = response.body.id;
    expect(response.status).toBe(200);
  });
  it('test get products', async () => {
    const response = await request
      .get('/product/index')
      .set('Content-type', 'application/json')
      .send();

    expect(response.status).toBe(200);
  });
  it('test update product', async () => {
    const response = await request
      .put('/product/update')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + accessToken)
      .send({
        product_id: product_id,
        product_name: 'watch',
        product_price: 3000,
      });
    expect(response.status).toBe(200);
  });
  it('test delete product', async () => {
    const response = await request
      .delete('/product/delete')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + accessToken)
      .send({
        product_id: product_id,
      });
    expect(response.status).toBe(200);
  });
});
