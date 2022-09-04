import client from '../database';

export type order = {
  user_id: number;
  status: string;
  product_id: number[];
  quantity: number[];
  price: number[];
};

export class store_orders {
  async getOrderProducts(
    order_id: number
  ): Promise<{ product_id: number; quantity: number; price: number }[]> {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT product_id,quantity,price from order_product where order_id=($1)';
      const result = await conn.query(sql, [order_id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`could not get order details ${error}`);
    }
  }
  async getUserOrders(
    user_id: number
  ): Promise<{ id: number; status: string }[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT id,status from orders where user_id=($1)';
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`could not get user orders ${error}`);
    }
  }
}
