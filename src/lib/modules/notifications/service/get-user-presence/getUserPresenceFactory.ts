import { FirebaseVendor } from '@/lib/shared/vendors/firebase';

import { withAdminAuthentication } from '../in-app/utils/withAdminAuthentication';

interface FactoryParams {
    firebase: FirebaseVendor;
}
export const factory = (params: FactoryParams) => async (userId: string) => {
    const firebase = await withAdminAuthentication(params.firebase);
    if (firebase.isAuthenticated() === false) {
        throw new Error('Notification service is not authenticated');
    }
    const presence = await firebase.getPresenceForUser(userId);
    return {
        isOnline: presence.status === 'online',
        lastChanged: presence.last_changed ?? null,
    };
};
