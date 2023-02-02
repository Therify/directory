import { generateWithConfig } from '@/lib/utils';
import { get } from 'env-var';

const FIREBASE_ADMIN_CLIENT_EMAIL = 'FIREBASE_ADMIN_CLIENT_EMAIL' as const;
const FIREBASE_ADMIN_PROJECT_ID = 'FIREBASE_ADMIN_PROJECT_ID' as const;
const FIREBASE_ADMIN_PRIVATE_KEY = 'FIREBASE_ADMIN_PRIVATE_KEY' as const;

export interface FirebaseAdminConfiguration {
    FIREBASE_ADMIN_CLIENT_EMAIL: string;
    FIREBASE_ADMIN_PROJECT_ID: string;
    FIREBASE_ADMIN_PRIVATE_KEY: string;
}
export const getFirebaseAdminConfiguration = (
    overrides: Partial<FirebaseAdminConfiguration> = {}
): FirebaseAdminConfiguration => ({
    FIREBASE_ADMIN_CLIENT_EMAIL: get(FIREBASE_ADMIN_CLIENT_EMAIL)
        .required()
        .asString(),
    FIREBASE_ADMIN_PROJECT_ID: get(FIREBASE_ADMIN_PROJECT_ID)
        .required()
        .asString(),
    FIREBASE_ADMIN_PRIVATE_KEY: get(FIREBASE_ADMIN_PRIVATE_KEY)
        .required()
        .asString(),
    ...overrides,
});

export const withFirebaseAdminConfiguration = generateWithConfig(
    getFirebaseAdminConfiguration
);
