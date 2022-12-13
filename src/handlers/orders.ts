import express, { Request, Response } from 'express';
import { Order, Order_product, orderStore } from '../Models/order';
import verifyAuthToken from '../middleware/verifyToken';

const store = new orderStore();

const index = async (_req: Request, res: Response) => {
    try {
        const orders = await store.index();
        res.json(orders);
    } catch (error) {
        res.json(error).status(400);
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const order = await store.show(req.body.id);
        res.json(order);
    } catch (error) {
        res.json(error).status(400);
    }
};

const create = async (req: Request, res: Response) => {
    const order: Order = {
        id: 0,
        user_id: req.body.user_id,
        status: req.body.status,
    };
    try {
        const newOrder = await store.create(order);
        res.json(newOrder);
    } catch (error) {
        res.json(error).status(400);
    }
};

const order_products = async (req: Request, res: Response) => {
    const orderedItems: Order_product = {
        id: 0,
        product_id: req.body.product_id,
        order_id: req.body.order_id,
        quantity: req.body.quantity,
    };
    try {
        const newItem = await store.orderProducts(orderedItems);
        res.json(newItem);
    } catch (error) {
        res.json(error).status(400);
    }
};

const ordersRoute = (app: express.Application) => {
    app.get('/orders', verifyAuthToken, index);
    app.get('/orders/id', verifyAuthToken, show);
    app.post('/orders', verifyAuthToken, create);
    app.post('/orders/addItems', verifyAuthToken, order_products);
};

export default ordersRoute;
