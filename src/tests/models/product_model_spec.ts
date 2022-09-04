import { store_products, product } from '../../models/product';

const productobject = new store_products();
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
    expect(result).toBeTruthy();
  });
  it('test show method', async () => {
    const result = await productobject.show(1);
    expect(result).toEqual({
      id: 1,
      name: 'watch',
      price: 1000,
    });
  });
  it('test delete method', async () => {
    const result = await productobject.delete(1);
    expect(result).toBeTrue();
  });
});
