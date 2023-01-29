import { CreateInAppNotification } from '@/lib/features/notifications/in-app';
import { InAppNotificationsFactoryParams } from '../factoryParams';
import { getUserNotificationsPath } from '../utils';
import { withAuthentication } from '../utils/withAuthentication';

export const createInAppNotificationFactory =
    (params: InAppNotificationsFactoryParams) =>
    async ({
        targetUserId,
        notification,
    }: CreateInAppNotification.Input): Promise<CreateInAppNotification.Output> => {
        const { firebase } = await withAuthentication(params);
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
