import { Notification } from '@/lib/types';

export const handleNotifications = (
    value: Record<string, unknown> | undefined | null
): Notification.InApp.PersitedType[] => {
    if (!value) return [];

    const notifications: Notification.InApp.PersitedType[] = Object.values(
        value
    )
        .reduce<Notification.InApp.PersitedType[]>((acc, value) => {
            const parsed = Notification.InApp.persistedSchema.safeParse(value);
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

    return notifications;
};
