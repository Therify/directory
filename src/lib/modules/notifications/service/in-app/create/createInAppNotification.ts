import { CreateInAppNotification } from '@/lib/modules/notifications/features/in-app';
import { InAppNotificationsFactoryParams } from '../factoryParams';
import { getUserNotificationsPath } from '../utils';
import { withAdminAuthentication } from '../utils/withAdminAuthentication';

export const createInAppNotificationFactory =
    (params: InAppNotificationsFactoryParams) =>
    async ({
        targetUserId,
        notification,
    }: CreateInAppNotification.Input): Promise<CreateInAppNotification.Output> => {
        const firebase = await withAdminAuthentication(params.firebase);
        if (firebase.isAuthenticated() === false) {
            throw new Error('Notification service is not authenticated');
        }
        await firebase.pushData(getUserNotificationsPath(targetUserId), {
            ...notification,
            isViewed: false,
        });
        return {
            success: true,
        };
    };
