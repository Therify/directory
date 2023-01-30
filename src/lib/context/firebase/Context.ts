import { createContext } from 'react';
import { FirebaseVendor, getFirebaseVendor } from '@/lib/vendors/firebase';

interface IContext {
    firebase: FirebaseVendor | null;
}

export const firebase = getFirebaseVendor('therify-client');

export const Context = createContext<IContext>({
    firebase,
});
