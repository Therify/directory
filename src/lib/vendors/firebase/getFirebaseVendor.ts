import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { withFirebaseConfiguration } from './configuration';
import {
    pushDataFactory,
    setDataFactory,
    readDataFactory,
    addListenerFactory,
    updateDataFactory,
    authenticateWithCustomTokenFactory,
    signOutFactory,
} from './methods';

export const getFirebaseVendor = (instanceName: string) =>
    withFirebaseConfiguration((CONFIG) => {
        const firebaseApp = initializeApp(
            {
                apiKey: CONFIG.FIREBASE_API_KEY,
                authDomain: CONFIG.FIREBASE_AUTH_DOMAIN,
                projectId: CONFIG.FIREBASE_PROJECT_ID,
                storageBucket: CONFIG.FIREBASE_STORAGE_BUCKET,
                messagingSenderId: CONFIG.FIREBASE_MESSAGING_SENDER_ID,
                appId: CONFIG.FIREBASE_APP_ID,
                databaseURL: CONFIG.FIREBASE_DATABASE_URL,
                measurementId: CONFIG.FIREBASE_MEASUREMENT_ID,
            },
            instanceName
        );

        const auth = getAuth(firebaseApp);
        const database = getDatabase(firebaseApp);

        return {
            isAuthenticated: () => Boolean(auth.currentUser),
            setData: setDataFactory({ database }),
            pushData: pushDataFactory({ database }),
            readData: readDataFactory({ database }),
            addListener: addListenerFactory({ database }),
            updateData: updateDataFactory({ database }),
            authenticateWithCustomToken: authenticateWithCustomTokenFactory({
                auth,
            }),
            signOut: signOutFactory({
                auth,
            }),
        };
    });

export type FirebaseVendor = ReturnType<typeof getFirebaseVendor>;
