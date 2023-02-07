import { prisma as orm } from '@/lib/prisma';
import { getFirebaseVendor } from '@/lib/vendors/firebase';
import { inAppNotificationFactory } from './in-app';
import { IN_APP_NOTIFICATIONS_SERVICE_IDENTIFIER } from './in-app/utils/constants';

export { IN_APP_NOTIFICATIONS_SERVICE_IDENTIFIER } from './in-app/utils/constants';

const firebase = getFirebaseVendor(IN_APP_NOTIFICATIONS_SERVICE_IDENTIFIER);

export const notificationsService = {
    inApp: inAppNotificationFactory({ firebase, orm }),
};

export type NotificationsService = typeof notificationsService;
