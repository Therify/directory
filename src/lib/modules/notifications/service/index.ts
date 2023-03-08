import { prisma as orm } from '@/lib/prisma';
import { getFirebaseVendor } from '@/lib/shared/vendors/firebase';
import { GetUserPresence } from './get-user-presence';
import { inAppNotificationFactory } from './in-app';
import { IN_APP_NOTIFICATIONS_SERVICE_IDENTIFIER } from './in-app/utils/constants';

export { IN_APP_NOTIFICATIONS_SERVICE_IDENTIFIER } from './in-app/utils/constants';

const firebase = getFirebaseVendor(IN_APP_NOTIFICATIONS_SERVICE_IDENTIFIER);

export const notificationsService = {
    inApp: inAppNotificationFactory({ firebase, orm }),
    getUserPresence: GetUserPresence.factory({ firebase }),
};

export type NotificationsService = typeof notificationsService;
