import { Notification } from '@/lib/types';

export const getNotificationCountForPath = (
    path: string,
    notifications: Notification.InApp.PersitedType[]
): number => {
    return notifications.reduce((acc, notification) => {
        if (notification.action?.target.startsWith(path)) {
            return acc + 1;
        }
        return acc;
    }, 0);
};
