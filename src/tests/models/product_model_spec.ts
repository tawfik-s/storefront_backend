import { store_products, product } from '../../models/product';

const productobject = new store_products();
let x = 1;
describe('test product model', () => {
  it('test model index returning data', async () => {
    const result = await productobject.index();
    expect(result).toBeDefined();
  });
  it('test create product', async () => {
    const newProduct: product = {
      name: 'watch',
      price: 1000,
    };
    const result = await productobject.create(newProduct);
    x = result;
    expect(result).toBeGreaterThan(0);
  });
  it('test show method before update', async () => {
    const result = await productobject.show(x);
    expect(result).toEqual({
      id: x,
      name: 'watch',
      price: 1000,
    });
  });
  it('test update product', async () => {
    const newProduct = {
      id: x,
      name: 'watch',
      price: 300,
    };
    const result = await productobject.update(newProduct);
    expect(result.id).toEqual(x);
  });

  it('test show method after update', async () => {
    const result = await productobject.show(x);
    expect(result).toEqual({
      id: x,
      name: 'watch',
      price: 300,
    });
  });
  it('test delete method', async () => {
    const result = await productobject.delete(x);
    expect(result).toBeTrue();
  });
});
