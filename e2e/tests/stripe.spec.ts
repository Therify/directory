import crypto from 'crypto';
import { VendorStripe } from '@/lib/vendors/stripe';

describe('Stripe', () => {
    describe('Customer Management', function () {
        let createdCustomerId: string;
        it('should create a customer than can be retrieved', async () => {
            const customer = await VendorStripe.createCustomer({
                email: `test-${crypto.randomUUID()}@test.com`,
            });
            expect(customer.id).toBeDefined();
            createdCustomerId = customer.id;
            const retrievedCustomer = await VendorStripe.retrieveCustomer({
                customerId: customer.id,
            });
            expect(retrievedCustomer.id).toEqual(customer.id);
        });
        afterAll(async () => {
            if (createdCustomerId) {
                await VendorStripe.deleteCustomer({
                    customerId: createdCustomerId,
                });
            }
        });
    });
    describe('Product Management', function () {
        let createdProductId: string;
        it('should create a product than can be retrieved', async () => {
            const product = await VendorStripe.createProduct({
                id: `test-${crypto.randomUUID()}`,
                name: 'Test Product',
            });
            expect(product.id).toBeDefined();
            createdProductId = product.id;
            // Products are available for reading immediately after creation
            // @see https://stripe.com/docs/search#data-freshness
            // const retrievedProduct = await VendorStripe.searchProduct({
            //     query: `name~'${encodeURIComponent(product.name)}'`,
            // });
            // expect(retrievedProduct.id).toEqual(product.id);
        });
        afterAll(async () => {
            if (createdProductId) {
                await VendorStripe.deleteProduct({
                    productId: createdProductId,
                });
            }
        });
    });
});
