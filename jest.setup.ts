import { localStorageMock } from '@/lib/shared/utils/test-utils/localStorageMock';
import '@testing-library/jest-dom';

process.env = Object.assign(process.env, {
    AUTH0_BACKEND_DOMAIN: 'test.auth0.com',
    AUTH0_BACKEND_CLIENT_ID: 'test-client-id',
    AUTH0_BACKEND_CLIENT_SECRET: 'dont-tell-nobody',
    STRIPE_SECRET_KEY: 'test-secret',
    FIREBASE_ADMIN_CLIENT_EMAIL: 'firebase-email@therify.co',
    FIREBASE_ADMIN_PROJECT_ID: 'firebase-project-id',
    FIREBASE_ADMIN_PRIVATE_KEY: 'firebase-private-key',
    KNOCK_API_KEY: 'knock-api-key',
    NYLAS_CLIENT_ID: 'nylas-client-id',
    NYLAS_CLIENT_SECRET: 'nylas-client-secret',
    NYLAS_API_SERVER: 'nylas-api-server',
    APPLICATION_URL: 'therify-application-url',
});
const window: Window & typeof globalThis = global?.window ?? {};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });
