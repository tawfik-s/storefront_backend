import supertest from 'supertest';
import app from '../../server';
import { store_orders, order } from '../../models/order';
import { store_users, user } from '../../models/user';
import { store_products, product } from '../../models/product';
import { incrypt } from '../../services/incryptPassService';
const userObject = new store_users();
const orderObject = new store_orders();
const productobject = new store_products();
const request = supertest(app);
let accessToken: string;
let product_id: number;
let order_id: number;
let product1: number, product2: number, product3: number;
let userid: number;
describe('Test orders end points and controller', () => {
  it('insert user and products', async () => {
    const newuser: user = {
      id: 0,
      firstname: 'tawfiq',
      lastname: 'shalash',
      password: incrypt('testtest'),
    };
    userid = await userObject.create(newuser);
    const newProduct: product = {
      name: 'watch',
      price: 1000,
    };
    product1 = await productobject.create(newProduct);
    product2 = await productobject.create(newProduct);
    product3 = await productobject.create(newProduct);
  });
  it('test auth login', async () => {
    const { body, status } = await request
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({
        firstname: 'tawfiq',
        lastname: 'shalash',
        password: 'testtest',
      });
    accessToken = body.accessToken;
    expect(status).toEqual(200);
  });
  it('test add order', async () => {
    const response = await request
      .post('/orders/create')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + accessToken)
      .send({
        status: 'active',
        product_id: [product1, product2, product3],
        quantity: [2, 3, 1],
        price: 2000,
      });
    expect(response.status).toBe(200);
  });
  it('test get user orders', async () => {
    const response = await request
      .get('/orders/myorders')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + accessToken)
      .send();
    console.log(response.body);
    order_id = response.body.result[0].id;
    expect(response.status).toBe(200);
  });
  it('test order products', async () => {
    const response = await request
      .get('/orders/products')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + accessToken)
      .send({
        order_id: order_id,
      });
    expect(response.status).toBe(200);
  });
  it('test update order', async () => {
    const response = await request
      .put('/orders/newstatus')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + accessToken)
      .send({
        order_id: order_id,
        status: 'complete',
      });
    expect(response.status).toBe(200);
  });
  it('test delete order', async () => {
    const response = await request
      .delete('/orders/delete')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + accessToken)
      .send({
        order_id: order_id,
      });
    expect(response.status).toBe(200);
  });
});
