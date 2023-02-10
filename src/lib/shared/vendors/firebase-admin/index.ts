import * as admin from 'firebase-admin';
import { withFirebaseAdminConfiguration } from './configuration';
import { createCustomTokenFactory } from './methods';

export const firebaseAdminVendor = withFirebaseAdminConfiguration((CONFIG) => {
    try {
        admin.initializeApp({
            credential: admin.credential.cert({
                clientEmail: CONFIG.FIREBASE_ADMIN_CLIENT_EMAIL,
                projectId: CONFIG.FIREBASE_ADMIN_PROJECT_ID,
                privateKey: CONFIG.FIREBASE_ADMIN_PRIVATE_KEY,
            }),
        });
    } catch (error) {
        /*
         * We skip the "already exists" message which is
         * not an actual error when we're hot-reloading.
         */
        if (error instanceof Error && !/already exists/u.test(error.message)) {
            console.error('Firebase admin initialization error', error.stack);
        }
    }

    return {
        createCustomToken: createCustomTokenFactory({
            admin,
        }),
    };
});

export type FirebaseAdminVendor = typeof firebaseAdminVendor;
