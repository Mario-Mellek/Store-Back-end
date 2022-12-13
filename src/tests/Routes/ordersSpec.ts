import supertest from 'supertest';
import app from '../../server';
import jwt, { Secret } from 'jsonwebtoken';
import { testUser } from './productsSpec';
import { Order, Order_product } from '../../Models/order';

const testOrder: Order = {
    user_id: 1,
    status: 'Active',
};

const orderedItems: Order_product = {
    product_id: 1,
    order_id: 1,
    quantity: 1,
};

const token = jwt.sign({ user: testUser }, process.env.SECRET as Secret);

const request = supertest(app);

describe('Order End-point testing', () => {
    it("Tests order's index GET route (No Token)", async () => {
        const response = await request.get('/orders');
        expect(response.status && response.text).toEqual(
            401 && 'Token Required'
        );
    });

    it("Tests order's index GET route (Token)", async () => {
        const response = await request
            .get('/orders')
            .set('Authorization', `Bearer ${token}`);
        const orderStatus = response.body[0].status;
        expect(response.status && orderStatus).toEqual(200 && 'Active');
    });

    it("Tests order's show GET route (No Token)", async () => {
        const response = await request.get('/orders/id').send({
            id: 1,
        });
        expect(response.status && response.text).toEqual(
            401 && 'Token Required'
        );
    });

    it("Tests order's show GET route (Token)", async () => {
        const response = await request
            .get('/orders/id')
            .send({
                id: 1,
            })
            .set('Authorization', `Bearer ${token}`);
        const orderStatus = response.body.status;
        expect(response.status && orderStatus).toEqual(200 && 'Active');
    });

    it("Tests order's create POST route (No Token)", async () => {
        const response = await request.post('/orders').send(testOrder);
        expect(response.status && response.text).toEqual(
            401 && 'Token Required'
        );
    });

    it("Tests order's create POST route (Token)", async () => {
        const response = await request
            .post('/orders')
            .send(testOrder)
            .set('Authorization', `Bearer ${token}`);
        const order_id = response.body.id;
        expect(response.status && order_id).toEqual(200 && 2);
    });

    it("Tests order's order_product POST route (No Token)", async () => {
        const response = await request
            .post('/orders/addItems')
            .send(orderedItems);
        expect(response.status && response.text).toEqual(
            401 && 'Token Required'
        );
    });

    it("Tests order's order_product POST route (Token)", async () => {
        const response = await request
            .post('/orders/addItems')
            .send(orderedItems)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status && response.body.order_id).toEqual(
            200 && orderedItems.order_id
        );
    });
});
