import client from '../database';
import bcrypt from 'bcrypt';

export type user = {
  id: number;
  firstname: string;
  lastname: string;
  password: string;
};

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS as string;

export class store_users {
  async index(): Promise<user[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`could not get users${error}`);
    }
  }
  async show(id: number): Promise<user> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users where id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not get users${error}`);
    }
  }
  async create(newuser: user): Promise<number> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO users(firstname,lastname,password) values($1,$2,$3) returning id';
      const result = await conn.query(sql, [
        newuser.firstname,
        newuser.lastname,
        newuser.password,
      ]);
      conn.release();
      return result.rows[0].id;
    } catch (error) {
      throw new Error(`could not create user ${error}`);
    }
  }
  async delete(id: number): Promise<void> {
    try {
      const conn = await client.connect();
      const sql = 'delete from users where id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return;
    } catch (error) {
      throw new Error(`could not delete user ${error}`);
    }
  }
  async checkIfUserExist(newuser: user): Promise<user | undefined> {
    try {
      const conn = await client.connect();
      const sql = 'select * from users where firstname=($1) and lastname=($2) ';
      const result = await conn.query(sql, [
        newuser.firstname,
        newuser.lastname,
      ]);
      conn.release();
      if (result.rows.length == 0) {
        return undefined;
      } else {
        return result.rows[0];
      }
    } catch (error) {
      throw new Error(`user is exist ${error}`);
    }
  }
  async update(newData: user): Promise<user> {
    try {
      const conn = await client.connect();

      const sql =
        'UPDATE users SET firstname=($1),lastname=($2),password=($3) WHERE id=($4) RETURNING *';

      const result = await conn.query(sql, [
        newData.firstname,
        newData.lastname,
        newData.password,
        newData.id,
      ]);

      const user = result.rows[0];

      conn.release();
      return user;
    } catch (err) {
      throw new Error(`can not update product ${err}`);
    }
  }
}
