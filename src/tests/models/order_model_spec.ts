import { store_orders, order } from '../../models/order';
import { store_users, user } from '../../models/user';
import { store_products, product } from '../../models/product';

const userObject = new store_users();
const orderObject = new store_orders();
const productobject = new store_products();
describe('test order model', () => {
  it('insert user and products', async () => {
    const newuser: user = {
      first_name: 'tawfik',
      last_name: 'shalash',
      password: '12',
    };
    await userObject.create(newuser);
    const newProduct: product = {
      name: 'watch',
      price: 1000,
    };
    await productobject.create(newProduct);
    await productobject.create(newProduct);
    await productobject.create(newProduct);
  });

  it('test create order', async () => {
    const newOrder: order = {
      user_id: 1,
      status: 'active',
      product_id: [1, 2, 3],
      quantity: [2, 3, 1],
      price: 2000,
    };
    const result = await orderObject.CreateOrder(newOrder);
    expect(result).toBeTrue();
  });
  it('test getUserOrders in order', async () => {
    const result = await orderObject.getUserOrders(1);
    expect(result.length).toEqual(1);
  });
  it('test getOrderProducts', async () => {
    const result = await orderObject.getOrderProducts(1);
    expect(result.length).toEqual(3);
  });
  it('test delete order', async () => {
    await orderObject.deleteOrder(1);
    expect(true).toBeTrue();
  });
  it('delete user and products', async () => {
    await userObject.delete(1);
    await productobject.delete(1);
    await productobject.delete(2);
    await productobject.delete(3);
    expect(true).toBeTrue();
  });
});
