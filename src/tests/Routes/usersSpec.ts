import supertest from 'supertest';
import app from '../../server';
import jwt, { Secret } from 'jsonwebtoken';
import { testUser } from './productsSpec';

const request = supertest(app);

const wrongUserPW = { ...testUser, password: 'Wrong PW' };

const token = jwt.sign({ user: testUser }, process.env.SECRET as Secret);

describe('User End-point testing', () => {
    it("Tests users's index GET route (No Token)", async () => {
        const response = await request.get('/users');
        expect(response.status && response.text).toEqual(
            401 && 'Token Required'
        );
    });

    it("Tests users's index GET route (Token)", async () => {
        const response = await request
            .get('/users')
            .set('Authorization', `Bearer ${token}`);
        const userName = response.body[0].username;
        expect(response.status && userName).toEqual(200 && 'TESTING');
    });

    it("Tests users's show GET route (No Token)", async () => {
        const response = await request.get('/users/id').send({
            id: 1,
        });
        expect(response.status && response.text).toEqual(
            401 && 'Token Required'
        );
    });

    it("Tests users's show GET route (Token)", async () => {
        const response = await request
            .get('/users/id')
            .send({
                id: 1,
            })
            .set('Authorization', `Bearer ${token}`);
        const userName = response.body.username;
        expect(response.status && userName).toEqual(200 && 'TESTING');
    });

    it("Tests users's create POST route", async () => {
        const response = await request.post('/users').send(testUser);
        expect(response.status).toEqual(200);
        expect(response.body.token).toBeTruthy();
    });

    it("Tests users's authenticate POST route (Incorrect UserName or Password)", async () => {
        const response = await request
            .post('/users/authenticate')
            .send(wrongUserPW);
        expect(response.status && response.text).toBe(
            200 && 'Incorrect username or password'
        );
    });

    it("Tests users's authenticate POST route (Correct UserName and Password)", async () => {
        const response = await request
            .post('/users/authenticate')
            .send(testUser);
        expect(response.status).toEqual(200);
        expect(response.body).toBeDefined();
    });
});
