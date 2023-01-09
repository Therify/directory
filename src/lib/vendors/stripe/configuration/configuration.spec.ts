import { getStripeConfiguration } from './configuration';

const currentEnv = process.env;

describe('Stripe Configuration', function () {
    describe('getStripeConfiguration', function () {
        it('should return a StripeConfiguration object', function () {
            const config = getStripeConfiguration();
            expect(config).toHaveProperty('STRIPE_SECRET_KEY');
        });
    });
    describe('errors', function () {
        beforeAll(() => {
            delete process.env.STRIPE_SECRET_KEY;
        });
        it('should throw an error if STRIPE_SECRET_KEY is not set', function () {
            expect(() => getStripeConfiguration()).toThrow();
        });
        afterAll(() => {
            process.env = currentEnv;
        });
    });
});
