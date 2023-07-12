import { getNylasConfiguration } from './configuration';

const currentEnv = process.env;

describe('Nylas Configuration', function () {
    describe('getNylasConfiguration', function () {
        it('should return a NylasConfiguration object', function () {
            const config = getNylasConfiguration();
            expect(config).toHaveProperty('NYLAS_CLIENT_ID');
        });
    });
    describe('errors', function () {
        beforeAll(() => {
            delete process.env.NYLAS_CLIENT_ID;
        });
        it('should throw an error if NYLAS_CLIENT_ID is not set', function () {
            expect(() => getNylasConfiguration()).toThrow();
        });
        afterAll(() => {
            process.env = currentEnv;
        });
    });
});
