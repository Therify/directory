import { PrismaClient } from '@prisma/client';
import { getFirebaseVendor } from '@/lib/vendors/firebase';
import { inAppNotificationFactory } from './in-app';
import { IN_APP_NOTIFICATIONS_SERVICE_IDENTIFIER } from './in-app/utils/constants';

export { IN_APP_NOTIFICATIONS_SERVICE_IDENTIFIER } from './in-app/utils/constants';

const firebase = getFirebaseVendor(IN_APP_NOTIFICATIONS_SERVICE_IDENTIFIER);
const orm = new PrismaClient({
    log: [{ level: 'query', emit: 'stdout' }],
});

export const notificationsService = {
    inApp: inAppNotificationFactory({ firebase, orm }),
};

export type NotificationsService = typeof notificationsService;
