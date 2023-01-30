import { FirebaseVendor } from '@/lib/vendors/firebase';
export const markNotificationAsViewedFactory =
    ({
        firebase,
        notificationsPath,
    }: {
        firebase: FirebaseVendor | null;
        notificationsPath: string;
    }) =>
    async (notificationId: string) => {
        if (!firebase) {
            console.error('Firebase not initialized');
            return;
        }
        try {
            return firebase.updateData(
                `${notificationsPath}/${notificationId}`,
                {
                    isViewed: true,
                }
            );
        } catch (error) {
            console.error(error);
        }
    };
