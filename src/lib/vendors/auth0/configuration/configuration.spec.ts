import { getAuth0Configuration } from './configuration';
let originalEnv: NodeJS.ProcessEnv;
describe('Auth0 Configuration', () => {
    test('retrieving Auth0 configuration', () => {
        expect(getAuth0Configuration()).toMatchObject({
            AUTH0_DOMAIN: expect.any(String),
            AUTH0_BACKEND_CLIENT_ID: expect.any(String),
            AUTH0_BACKEND_CLIENT_SECRET: expect.any(String),
        });
    });
    describe('Required Environment Variables', () => {
        beforeAll(() => {
            originalEnv = process.env;
            delete process.env.AUTH0_DOMAIN;
            delete process.env.AUTH0_BACKEND_CLIENT_ID;
            delete process.env.AUTH0_BACKEND_CLIENT_SECRET;
        });
        it('throws an error if Auth0 environment variables are not set', () => {
            expect(() => getAuth0Configuration()).toThrowError();
        });
        afterAll(() => {
            process.env = originalEnv;
        });
    });
});
