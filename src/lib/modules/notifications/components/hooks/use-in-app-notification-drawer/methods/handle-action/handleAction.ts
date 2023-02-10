import { Notification } from '@/lib/shared/types';

export const handleActionFactory =
    ({
        navigateTo,
        callback,
    }: {
        navigateTo: (path: string) => void;
        callback: (notification: Notification.InApp.PersitedType) => void;
    }) =>
    (notification: Notification.InApp.PersitedType) => {
        if (notification.action?.type === 'navigate') {
            navigateTo(notification.action.target);
        }
        callback(notification);
    };
