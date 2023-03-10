import { Notification } from '@/lib/shared/types';
import { FirebaseVendor } from '@/lib/shared/vendors/firebase';

export const clearActionlessNotificationsFactory =
    ({
        notifications,
        firebase,
        notificationsPath,
    }: {
        notificationsPath: string;
        notifications: Notification.InApp.PersitedType[];
        firebase: FirebaseVendor | null;
    }) =>
    async () => {
        if (!firebase) {
            console.error('Firebase not initialized');
            return;
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
