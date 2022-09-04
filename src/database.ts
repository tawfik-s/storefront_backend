import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_TEST_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = process.env;

let databaseconfig = {
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
};

if (process.env.ENV == 'test') {
  databaseconfig = {
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  };
}

const client = new Pool(databaseconfig);

export default client;
