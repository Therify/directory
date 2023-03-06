import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getDatabase, Unsubscribe } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import {
    pushDataFactory,
    setDataFactory,
    readDataFactory,
    addListenerFactory,
    updateDataFactory,
    authenticateWithCustomTokenFactory,
    signOutFactory,
    readPresenceFactory,
    establishPresence,
    setPresenceFactory,
} from './methods';

export const getFirebaseVendor = (instanceName: string) => {
    const options: FirebaseOptions = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
        measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    };

    const firebaseApp = initializeApp(options, instanceName);
    const auth = getAuth(firebaseApp);
    const database = getDatabase(firebaseApp);
    const setPresence = setPresenceFactory({ database });

    let unsubscribePresenceListener: Unsubscribe = async () => {};
    const unsubscribeOnAuthStateChange = auth.onAuthStateChanged((user) => {
        unsubscribePresenceListener();
        if (user?.uid) {
            unsubscribePresenceListener = establishPresence(user.uid, database);
        }
    });
    const signOut = signOutFactory({
        auth,
    });

    return {
        getSignedInUserId: () => auth.currentUser?.uid,
        isAuthenticated: () => Boolean(auth.currentUser),
        setData: setDataFactory({ database }),
        pushData: pushDataFactory({ database }),
        readData: readDataFactory({ database }),
        addListener: addListenerFactory({ database }),
        updateData: updateDataFactory({ database }),
        getPresenceForUser: readPresenceFactory({ database }),
        setPresence,
        authenticateWithCustomToken: authenticateWithCustomTokenFactory({
            auth,
        }),
        signOut: () => {
            return signOut([
                unsubscribePresenceListener,
                unsubscribeOnAuthStateChange,
                () => {
                    return auth.currentUser?.uid
                        ? setPresence(
                              auth.currentUser.uid,
                              'offline',
                              '/logout'
                          )
                        : null;
                },
            ]);
        },
    };
};

export type FirebaseVendor = ReturnType<typeof getFirebaseVendor>;
