import { generateWithConfig } from '@/lib/utils';
import { get } from 'env-var';

const FIREBASE_API_KEY = 'NEXT_PUBLIC_FIREBASE_API_KEY' as const;
const FIREBASE_AUTH_DOMAIN = 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN' as const;
const FIREBASE_PROJECT_ID = 'NEXT_PUBLIC_FIREBASE_PROJECT_ID' as const;
const FIREBASE_STORAGE_BUCKET = 'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET' as const;
const FIREBASE_MESSAGING_SENDER_ID =
    'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID' as const;
const FIREBASE_APP_ID = 'NEXT_PUBLIC_FIREBASE_APP_ID' as const;
const FIREBASE_DATABASE_URL = 'NEXT_PUBLIC_FIREBASE_DATABASE_URL' as const;
const FIREBASE_MEASUREMENT_ID = 'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID' as const;

export interface FirebaseConfiguration {
    NEXT_PUBLIC_FIREBASE_API_KEY: string;
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: string;
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
    NEXT_PUBLIC_FIREBASE_APP_ID: string;
    NEXT_PUBLIC_FIREBASE_DATABASE_URL: string;
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID?: string;
}

export const getFirebaseConfiguration = (
    overrides: Partial<FirebaseConfiguration> = {}
): FirebaseConfiguration => ({
    NEXT_PUBLIC_FIREBASE_API_KEY: get(FIREBASE_API_KEY).required().asString(),
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: get(FIREBASE_AUTH_DOMAIN)
        .required()
        .asString(),
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: get(FIREBASE_PROJECT_ID)
        .required()
        .asString(),
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: get(FIREBASE_STORAGE_BUCKET)
        .required()
        .asString(),
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: get(FIREBASE_MESSAGING_SENDER_ID)
        .required()
        .asString(),
    NEXT_PUBLIC_FIREBASE_APP_ID: get(FIREBASE_APP_ID).required().asString(),
    NEXT_PUBLIC_FIREBASE_DATABASE_URL: get(FIREBASE_DATABASE_URL)
        .required()
        .asString(),
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: get(
        FIREBASE_MEASUREMENT_ID
    ).asString(),
    ...overrides,
});

export const withFirebaseConfiguration = generateWithConfig(
    getFirebaseConfiguration
);
