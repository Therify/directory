import * as admin from 'firebase-admin';
import { withFirebaseAdminConfiguration } from './configuration';
import { createCustomTokenFactory } from './methods';

let firebaseAdminApp: ReturnType<typeof admin.initializeApp>;

export const firebaseAdminVendor = withFirebaseAdminConfiguration((CONFIG) => {
    if (!firebaseAdminApp) {
        firebaseAdminApp = admin.initializeApp({
            credential: admin.credential.cert({
                clientEmail: CONFIG.FIREBASE_ADMIN_CLIENT_EMAIL,
                projectId: CONFIG.FIREBASE_ADMIN_PROJECT_ID,
                privateKey: CONFIG.FIREBASE_ADMIN_PRIVATE_KEY,
            }),
        });
    }
    return {
        createCustomToken: createCustomTokenFactory({
            admin: firebaseAdminApp,
        }),
    };
});

export type FirebaseAdminVendor = typeof firebaseAdminVendor;
