import { firebaseAdminVendor } from '@/lib/shared/vendors/firebase-admin';
import { InAppNotificationsFactoryParams } from '../factoryParams';
import { IN_APP_NOTIFICATIONS_SERVICE_IDENTIFIER } from './constants';

export const withAuthentication = async (
    params: InAppNotificationsFactoryParams
) => {
    if (params.firebase.isAuthenticated() === false) {
        await firebaseAdminVendor
            .createCustomToken({
                userId: IN_APP_NOTIFICATIONS_SERVICE_IDENTIFIER,
            })
            .then((token) => {
                return params.firebase.authenticateWithCustomToken(token);
            })
            .catch((error) => {
                console.error(error);
                throw new Error(
                    error?.message ?? 'Unable to authenticate with firebase'
                );
            });
    }
    return params;
};
