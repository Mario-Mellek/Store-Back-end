import Client from '../database';

export type Product = {
    id?: number;
    name: string;
    price: number;
};

export class productStore {
    async index(): Promise<Product[]> {
        try {
            const sql = 'SELECT * FROM products';
            const conn = await Client.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Cannot get products ${error}`);
        }
    }

    async show(id: number): Promise<Product> {
        try {
            const sql = 'SELECT * FROM products WHERE "id"= $1';
            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot find the product id:${id} \n${error}`);
        }
    }

    async create(p: Product): Promise<Product> {
        try {
            const sql =
                'INSERT INTO products ("name", "price") VALUES ($1, $2) RETURNING *';
            const conn = await Client.connect();
            const result = await conn.query(sql, [p.name, p.price]);
            conn.release();
            const product = result.rows[0];
            return product;
        } catch (error) {
            throw new Error(`Cannot create the product ${p.name} \n${error}`);
        }
    }
}
