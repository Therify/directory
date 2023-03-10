import { Notification } from '@/lib/shared/types';

export const getNotificationCountForPath = (
    path: string,
    notifications: Notification.InApp.PersitedType[]
): number => {
    return notifications.reduce((acc, notification) => {
        if (
            !notification.isViewed &&
            notification.action?.target.startsWith(path)
        ) {
            return acc + 1;
        }
        return acc;
    }, 0);
};
