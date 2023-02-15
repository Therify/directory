import '@testing-library/jest-dom';

process.env = Object.assign(process.env, {
    AUTH0_BACKEND_DOMAIN: 'test.auth0.com',
    AUTH0_BACKEND_CLIENT_ID: 'test-client-id',
    AUTH0_BACKEND_CLIENT_SECRET: 'dont-tell-nobody',
    STRIPE_SECRET_KEY: 'test-secret',
    FIREBASE_ADMIN_CLIENT_EMAIL: 'firebase-email@therify.co',
    FIREBASE_ADMIN_PROJECT_ID: 'firebase-project-id',
    FIREBASE_ADMIN_PRIVATE_KEY: 'firebase-private-key',
});
