import { Notification } from '@/lib/types';

export const handleNotificationsChangeFactory =
    ({
        setNotifications,
    }: {
        setNotifications: (
            notifications: Notification.InApp.PersitedType[]
        ) => void;
    }) =>
    (value: Record<string, unknown> | undefined | null) => {
        if (!value) return setNotifications([]);
        const notifications: Notification.InApp.PersitedType[] = Object.values(
            value
        )
            .reduce<Notification.InApp.PersitedType[]>((acc, value) => {
                const parsed =
                    Notification.InApp.persistedSchema.safeParse(value);
                if (parsed.success) {
                    return [...acc, parsed.data];
                }
                return acc;
            }, [])
            .sort((a, b) => {
                return (
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                );
            });

        setNotifications(notifications);
    };
