import { productStore, Product } from '../../Models/product';

const store = new productStore();

const testProduct: Product = {
    name: 'test product',
    price: '50' as unknown as number,
};

describe('Product Model testing', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
});

describe('Testing Product methods', () => {
    it('Create method=> Should add a product', async () => {
        const result = await store.create(testProduct);
        expect(result.name && result.price).toEqual(
            testProduct.name && testProduct.price
        );
    });

    it('Index method=> Should list all products', async () => {
        const result = await store.index();
        expect(result).toBeDefined();
    });

    it('Show method=> should show a single product', async () => {
        const result = await store.show(1);
        expect(result.name).toEqual(testProduct.name);
    });
});
