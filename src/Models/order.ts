import Client from '../database';

export type Order = {
    id?: number;
    user_id: number;
    status: string;
};

export type Order_product = {
    id?: number;
    product_id: number;
    order_id: number;
    quantity: number;
};

export class orderStore {
    async index(): Promise<Order[]> {
        try {
            const sql = 'SELECT * FROM orders';
            const conn = await Client.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Cannot get orders ${error}`);
        }
    }

    async show(order_id: number): Promise<Order> {
        try {
            const sql = 'SELECT * FROM orders WHERE "id"= $1';
            const conn = await Client.connect();
            const result = await conn.query(sql, [order_id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`
            Cannot find the order id:${order_id} \n${error}`);
        }
    }

    async create(o: Order): Promise<Order> {
        try {
            const sql =
                'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *';
            const conn = await Client.connect();
            const result = await conn.query(sql, [o.user_id, o.status]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot create the order \n${error}`);
        }
    }

    async orderProducts(ordered: Order_product): Promise<Order_product> {
        try {
            const sql =
                'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
            const conn = await Client.connect();
            const result = await conn.query(sql, [
                ordered.order_id,
                ordered.product_id,
                ordered.quantity,
            ]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Cannot add the product_id ${ordered.product_id} in the order_id ${ordered.order_id} \n${error}`
            );
        }
    }
}
