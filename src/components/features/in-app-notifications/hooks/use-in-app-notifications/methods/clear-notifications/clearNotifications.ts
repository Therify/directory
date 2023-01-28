import { Notification } from '@/lib/types';
import { FirebaseVendor } from '@/lib/vendors/firebase';

export const clearNotificationsFactory =
    ({
        clearLocalNotifications,
        notifications,
        firebase,
        notificationsPath,
    }: {
        notificationsPath?: string;
        notifications: Notification.InApp.PersitedType[];
        clearLocalNotifications: () => void;
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
        clearLocalNotifications();
        const updatePayload = notifications.reduce((acc, { id }) => {
            acc[`${id}/isViewed`] = true;
            return acc;
        }, {} as Record<string, true>);
        try {
            return firebase.updateData(notificationsPath, updatePayload);
        } catch (error) {
            console.error(error);
            // Pop an alert here
        }
    };
