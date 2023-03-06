import { FirebaseVendor } from '@/lib/shared/vendors/firebase';
import { firebaseAdminVendor } from '@/lib/shared/vendors/firebase-admin';
import { IN_APP_NOTIFICATIONS_SERVICE_IDENTIFIER } from './constants';

export const withAdminAuthentication = async (firebase: FirebaseVendor) => {
    if (firebase.isAuthenticated() === false) {
        await firebaseAdminVendor
            .createCustomToken({
                userId: IN_APP_NOTIFICATIONS_SERVICE_IDENTIFIER,
            })
            .then((token) => {
                return firebase.authenticateWithCustomToken(token);
            })
            .catch((error) => {
                console.error(error);
                throw new Error(
                    error?.message ?? 'Unable to authenticate with firebase'
                );
            });
    }
    return firebase;
};
