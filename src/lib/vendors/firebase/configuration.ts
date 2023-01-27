import { generateWithConfig } from '@/lib/utils';
import { get } from 'env-var';

const FIREBASE_API_KEY = 'FIREBASE_API_KEY' as const;
const FIREBASE_AUTH_DOMAIN = 'FIREBASE_AUTH_DOMAIN' as const;
const FIREBASE_PROJECT_ID = 'FIREBASE_PROJECT_ID' as const;
const FIREBASE_STORAGE_BUCKET = 'FIREBASE_STORAGE_BUCKET' as const;
const FIREBASE_MESSAGING_SENDER_ID = 'FIREBASE_MESSAGING_SENDER_ID' as const;
const FIREBASE_APP_ID = 'FIREBASE_APP_ID' as const;
const FIREBASE_DATABASE_URL = 'FIREBASE_DATABASE_URL' as const;
const FIREBASE_MEASUREMENT_ID = 'FIREBASE_MEASUREMENT_ID' as const;

export interface FirebaseConfiguration {
    FIREBASE_API_KEY: string;
    FIREBASE_AUTH_DOMAIN: string;
    FIREBASE_PROJECT_ID: string;
    FIREBASE_STORAGE_BUCKET: string;
    FIREBASE_MESSAGING_SENDER_ID: string;
    FIREBASE_APP_ID: string;
    FIREBASE_DATABASE_URL: string;
    FIREBASE_MEASUREMENT_ID?: string;
}

export const getFirebaseConfiguration = (
    overrides: Partial<FirebaseConfiguration> = {}
): FirebaseConfiguration => ({
    FIREBASE_API_KEY: get(FIREBASE_API_KEY).required().asString(),
    FIREBASE_AUTH_DOMAIN: get(FIREBASE_AUTH_DOMAIN).required().asString(),
    FIREBASE_PROJECT_ID: get(FIREBASE_PROJECT_ID).required().asString(),
    FIREBASE_STORAGE_BUCKET: get(FIREBASE_STORAGE_BUCKET).required().asString(),
    FIREBASE_MESSAGING_SENDER_ID: get(FIREBASE_MESSAGING_SENDER_ID)
        .required()
        .asString(),
    FIREBASE_APP_ID: get(FIREBASE_APP_ID).required().asString(),
    FIREBASE_DATABASE_URL: get(FIREBASE_DATABASE_URL).required().asString(),
    FIREBASE_MEASUREMENT_ID: get(FIREBASE_MEASUREMENT_ID).asString(),
    ...overrides,
});

export const withFirebaseConfiguration = generateWithConfig(
    getFirebaseConfiguration
);
