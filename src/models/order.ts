import { Connection } from 'pg';
import client from '../database';

export type order = {
  user_id: number;
  status: string; //active or complete
  product_id: number[];
  quantity: number[];
  price: number;
};

export class store_orders {
  async getOrderProducts(
    order_id: number
  ): Promise<{ product_id: number; quantity: number }[]> {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT product_id,quantity from order_product where order_id=($1)';
      const result = await conn.query(sql, [order_id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`could not get order details ${error}`);
    }
  }
  async getUserOrders(
    user_id: number
  ): Promise<{ id: number; status: string; price: number }[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT id,status,price from orders where user_id=($1)';
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`could not get user orders ${error}`);
    }
  }
  async CreateOrder(newOrder: order): Promise<boolean> {
    try {
      const conn = await client.connect();
      const sql =
        'insert into orders(user_id,status,price) values ($1,$2,$3) returning *';
      const user_result = await conn.query(sql, [
        newOrder.user_id,
        newOrder.status,
        newOrder.price,
      ]);
      const order_id = user_result.rows[0].id;
      let len = Math.min(newOrder.product_id.length, newOrder.quantity.length);
      for (let i = 0; i < len; i++) {
        const sql =
          'insert into order_product(order_id,product_id,quantity) values($1,$2,$3)';
        await conn.query(sql, [
          order_id,
          newOrder.product_id[i],
          newOrder.quantity[i],
        ]);
      }
      conn.release();
      return true;
    } catch (error) {
      throw new Error(`could not create new order ${error}`);
    }
  }
  async UpdateOrderStatus(id: number, status: string): Promise<void> {
    try {
      const conn = await client.connect();
      const sql = 'update orders set status=($1) where id=($2)';
      await conn.query(sql, [status, id]);
      conn.release();
    } catch (error) {
      throw new Error(`could not change order status${error}`);
    }
  }
  async deleteOrder(id: number): Promise<void> {
    try {
      const conn = await client.connect();
      const sql1 = 'delete from order_product where order_id=($1)';
      await conn.query(sql1, [id]);
      const sql2 = 'delete from orders where id=($1)';
      await conn.query(sql2, [id]);
      conn.release();
    } catch (error) {
      throw new Error(`could not delete order${error}`);
    }
  }
}
