import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

let client;

const { PG_HOST, PG_DB, PG_TEST_DB, PG_USER, PG_PASSWORD, ENV } = process.env;

if (ENV === 'dev') {
    client = new Pool({
        host: PG_HOST,
        database: PG_DB,
        user: PG_USER,
        password: PG_PASSWORD,
    });
}

if (ENV === 'test') {
    client = new Pool({
        host: PG_HOST,
        database: PG_TEST_DB,
        user: PG_USER,
        password: PG_PASSWORD,
    });
}

export default client as Pool;
