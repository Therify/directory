import { Notification } from '@/lib/types';
import { FirebaseVendor } from '@/lib/vendors/firebase';

export const clearActionlessNotificationsFactory =
    ({
        notifications,
        firebase,
        notificationsPath,
    }: {
        notificationsPath?: string;
        notifications: Notification.InApp.PersitedType[];
        firebase: FirebaseVendor | null;
    }) =>
    async () => {
        if (!firebase) {
            console.error('Firebase not initialized');
            return;
        }
        if (!notificationsPath) {
            return console.error('Notifications path not initialized');
        }
        const updatePayload = notifications.reduce(
            (acc, { id, action, isViewed }) => {
                if (action === undefined && isViewed === false) {
                    acc[`${id}/isViewed`] = true;
                }
                return acc;
            },
            {} as Record<string, true>
        );
        try {
            if (Object.keys(updatePayload).length === 0) return;
            return firebase.updateData(notificationsPath, updatePayload);
        } catch (error) {
            console.error(error);
            // Pop an alert here
        }
    };
