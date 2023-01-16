import '@testing-library/jest-dom';

process.env = Object.assign(process.env, {
    AUTH0_DOMAIN: 'test.auth0.com',
    AUTH0_BACKEND_CLIENT_ID: 'test-client-id',
    AUTH0_BACKEND_CLIENT_SECRET: 'dont-tell-nobody',
    STRIPE_SECRET_KEY: 'test-secret',
});
