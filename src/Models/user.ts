import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const saltRounds = process.env.SALT_ROUNDS;
const pepper = process.env.BCRYPT_PASSWORD;

export type User = {
    id?: number;
    firstName: string;
    lastName: string;
    password: string;
    userName: string;
};

export class UserLogStore {
    async index(): Promise<User[]> {
        try {
            const sql = 'SELECT * FROM users';
            const conn = await Client.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Cannot get users ${error}`);
        }
    }

    async show(id: number): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE "id"= $1';
            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot find the user id:${id} \n${error}`);
        }
    }

    async create(u: User): Promise<User> {
        try {
            const sql =
                'INSERT INTO users ("firstname", "lastname", "password", "username") VALUES ($1, $2, $3, $4) RETURNING *';
            const conn = await Client.connect();
            const salt = await bcrypt.genSalt(parseInt(saltRounds as string));
            const hash = await bcrypt.hash(u.password + pepper, salt);
            const result = await conn.query(sql, [
                u.firstName,
                u.lastName,
                hash,
                u.userName,
            ]);
            conn.release();
            const user = result.rows[0];
            return user;
        } catch (error) {
            throw new Error(
                `Cannot create the user ${u.firstName} ${u.lastName} \n${error}`
            );
        }
    }

    async authenticate(
        userName: string,
        password: string
    ): Promise<User | null> {
        try {
            const sql = 'SELECT password FROM users WHERE userName= ($1)';
            const conn = await Client.connect();
            const result = await conn.query(sql, [userName]);
            conn.release();

            if (result.rows.length) {
                const user: User = result.rows[0];
                if (bcrypt.compareSync(password + pepper, user.password)) {
                    return user;
                }
            }
            return null;
        } catch (error) {
            throw new Error(`Invalid inputs ${userName}\n ${error}`);
        }
    }
}
