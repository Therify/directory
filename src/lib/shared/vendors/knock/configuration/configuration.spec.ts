import { getKnockConfiguration } from './configuration';

const currentEnv = process.env;

describe('Knock Configuration', function () {
    describe('getKnockConfiguration', function () {
        it('should return a KnockConfiguration object', function () {
            const config = getKnockConfiguration();
            expect(config).toHaveProperty('KNOCK_API_KEY');
        });
    });
    describe('errors', function () {
        beforeAll(() => {
            delete process.env.KNOCK_API_KEY;
        });
        it('should throw an error if KNOCK_API_KEY is not set', function () {
            expect(() => getKnockConfiguration()).toThrow();
        });
        afterAll(() => {
            process.env = currentEnv;
        });
    });
});
