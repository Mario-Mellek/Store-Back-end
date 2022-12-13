import { UserLogStore } from '../../Models/user';
import { testUser } from '../Routes/productsSpec';

const store = new UserLogStore();

describe('User Model testing', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have an authenticate method', () => {
        expect(store.authenticate).toBeDefined();
    });
});

describe('Testing User methods', () => {
    it('Create method=> Should add a user', async () => {
        const result = await store.create(testUser);
        expect(result).toBeDefined();
    });

    it('Index method=> Should list all users', async () => {
        const result = await store.index();
        expect(result).toBeDefined();
    });

    it('Show method=> should show a single User', async () => {
        const result = await store.show(1);
        expect(result.id).toEqual(1);
    });

    it('authenticate method=> should not authenticate a user (Wrong password)', async () => {
        const result = await store.authenticate(
            testUser.userName,
            'Wrong Password'
        );
        expect(result).toBe(null);
    });

    it('authenticate method=> should authenticate a user (Correct password)', async () => {
        const result = await store.authenticate(
            testUser.userName,
            testUser.password
        );
        expect(result).toBeDefined();
    });
});
