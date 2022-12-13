import { Order_product, Order, orderStore } from '../../Models/order';

const store = new orderStore();
const order_product: Order_product = {
    // product_id is a foreign key that can't be set manually as it violates foreign key constraints
    product_id: null as unknown as number,
    order_id: 1,
    quantity: 1,
};

const order: Order = {
    // user_id is a foreign key that can't be set manually as it violates foreign key constraint
    user_id: null as unknown as number,
    status: 'Active',
};

describe('Order Model testing', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have an order products method', () => {
        expect(store.orderProducts).toBeDefined();
    });
});

describe('Testing Order methods', () => {
    it('Create method=> Should add an order', async () => {
        const result = await store.create(order);
        expect(result.status).toEqual(order.status);
    });

    it('Index method=> Should list all orders', async () => {
        const result = await store.index();
        expect(result).toBeDefined();
    });

    it('Show method=> should show a single order', async () => {
        const result = await store.show(1);
        expect(result.id).toEqual(1);
    });

    it('orderProducts method=> should add product to order', async () => {
        const result = await store.orderProducts(order_product);
        expect(result.order_id && result.quantity).toEqual(
            order_product.order_id && order_product.quantity
        );
    });
});
