import express, { Request, Response } from 'express';
import { Product, productStore } from '../Models/product';
import verifyAuthToken from '../middleware/verifyToken';

const store = new productStore();

const index = async (_req: Request, res: Response) => {
    try {
        const products = await store.index();
        res.json(products);
    } catch (error) {
        res.json(error).status(400);
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const product = await store.show(req.body.id);
        res.json(product);
    } catch (error) {
        res.json(error).status(400);
    }
};

const create = async (req: Request, res: Response) => {
    const product: Product = {
        name: req.body.name,
        price: req.body.price,
    };
    try {
        const newProduct = await store.create(product);
        res.json(newProduct);
    } catch (error) {
        res.json(error).status(400);
    }
};

const productRoutes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/id', show);
    app.post('/products', verifyAuthToken, create);
};

export default productRoutes;
