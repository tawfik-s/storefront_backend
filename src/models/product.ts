import client from '../database';

export type product = {
  name: string;
  price: number;
};

export class store_products {
  async index(): Promise<{ id: number; name: string; price: number }[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM product';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products${err}`);
    }
  }

  async show(id: number): Promise<{ id: number; name: string; price: number }> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM product where id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get product${err}`);
    }
  }

  async create(newProduct: product): Promise<number> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO product (name,price) values ($1,$2) RETURNING id';
      const result = await conn.query(sql, [newProduct.name, newProduct.price]);
      conn.release();
      return result.rows[0].id;
    } catch (error) {
      throw new Error(`can't insert new data ${error}`);
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE from product where id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return true;
    } catch (error) {
      throw new Error(`error while deleting${error}`);
    }
  }

  async update(newData: { id: number; name: string; price: number }): Promise<{
    id: number;
    name: string;
    price: number;
  }> {
    try {
      const conn = await client.connect();
      const sql =
        'update products set name=($2) ,price=($3) WHERE id=($1) returning *';

      const result = await conn.query(sql, [
        newData.id,
        newData.name,
        newData.price,
      ]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`can not update product ${err}`);
    }
  }
}
