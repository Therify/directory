import crypto from 'crypto';
import { VendorStripe } from '@/lib/vendors/stripe';

let createdCustomerId: string;

describe('Stripe', () => {
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
