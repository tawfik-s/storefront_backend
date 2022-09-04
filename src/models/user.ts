import client from '../database';
import bcrypt from 'bcrypt';

export type user = {
  first_name: string;
  last_name: string;
  password: string;
};

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS as string;

export class store_users {
  //   async CheckIfUserExist(newuser: user): Promise<boolean> {
  //     try {
  //       const conn = await client.connect();
  //       const sql = 'SELECT * from users where firstname=($1) AND lastname=($2)';
  //       const result = await conn.query(sql, [
  //         newuser.first_name,
  //         newuser.last_name,
  //       ]);
  //       conn.release();
  //       return bcrypt
  //         .compare(newuser.password, result.rows[0].password)
  //         .then(() => {
  //           return true;
  //         })
  //         .catch(() => {
  //           return false;
  //         });
  //     } catch (error) {
  //       throw new Error(`erro in check user if exist ${error}`);
  //     }
  //   }
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
  async show(
    id: number
  ): Promise<{
    id: number;
    firstname: string;
    lastname: string;
    password: string;
  }> {
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
  async create(newuser: user): Promise<boolean> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO users(firstname,lastname,password) values($1,$2,$3)';
      const result = await conn.query(sql, [
        newuser.first_name,
        newuser.last_name,
        newuser.password,
      ]);
      conn.release();
      return true;
    } catch (error) {
      throw new Error(`could not create user ${error}`);
    }
  }
}
