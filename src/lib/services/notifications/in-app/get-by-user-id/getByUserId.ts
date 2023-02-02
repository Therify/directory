import { GetNotificationsByUserId } from '@/lib/features/notifications/in-app';
import { Notification } from '@/lib/types';
import { InAppNotificationsFactoryParams } from '../factoryParams';
import { getUserNotificationsPath } from '../utils';

export const getByUserIdFactory =
    ({ firebase }: InAppNotificationsFactoryParams) =>
    async ({
        userId,
    }: GetNotificationsByUserId.Input): Promise<GetNotificationsByUserId.Output> => {
        const rawNotifications = await firebase.readData(
            getUserNotificationsPath(userId)
        );
        const notifications = Object.values(rawNotifications || {}).reduce<
            Notification.InApp.PersitedType[]
        >((acc, notification) => {
            const parseResult =
                Notification.InApp.persistedSchema.safeParse(notification);
            if (parseResult.success) {
                return [...acc, parseResult.data];
            }
            return acc;
        }, []);
        return {
            notifications,
            errors: [],
        };
    };
