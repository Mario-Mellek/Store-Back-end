import supertest from 'supertest';
import app from '../../server';
import jwt, { Secret } from 'jsonwebtoken';
import { User } from '../../Models/user';
import { Product } from '../../Models/product';

const request = supertest(app);

export const testProduct: Product = {
    name: 'TestProduct2',
    price: 100,
};

export const testUser: User = {
    firstName: 'Test',
    lastName: 'User',
    password: 'Dummy PW',
    userName: 'TESTING',
};

describe('Product End-point testing', () => {
    it("Tests product's index GET route", async () => {
        const response = await request.get('/products');
        expect(response.status).toBe(200);
    });

    it("Tests product's show GET route", async () => {
        const response = await request.get('/products/id').send({
            id: 1,
        });
        expect(response.body.name).toBe('test product');
    });

    it("Tests product's create POST route (No Token)", async () => {
        const response = await request.post('/products').send(testProduct);
        expect(response.status).toEqual(401);
    });

    it("Tests product's create POST route (Token)", async () => {
        const response = await request
            .post('/products')
            .send(testProduct)
            .set(
                'Authorization',
                `Bearer ${jwt.sign(
                    { user: testUser },
                    process.env.SECRET as Secret
                )}`
            );
        expect(response.body.name).toBe('TestProduct2');
    });
});
