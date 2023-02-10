import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { InAppNotificationsContext } from '../../context';
import { getNotificationCountForPath } from './methods';
import { handleActionFactory } from './methods/handle-action/handleAction';
import { FirebaseClient } from '@/lib/shared/context';
import { NavigationLink } from '@/lib/sitemap';

export const useInAppNotificationDrawer = () => {
    const {
        notifications,
        clearNotifications,
        markNotificationAsViewed,
        clearActionlessNotifications,
    } = useContext(InAppNotificationsContext.Context);
    const router = useRouter();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return {
        notifications,
        clearNotifications,
        clearActionlessNotifications,
        drawer: {
            isOpen: isDrawerOpen,
            close: () => setIsDrawerOpen(false),
            open: () => setIsDrawerOpen(true),
        },
        unreadCount: notifications.filter((n) => !n.isViewed).length,
        handleAction: handleActionFactory({
            navigateTo: router.push,
            callback: ({ id }) => {
                setIsDrawerOpen(false);
                markNotificationAsViewed(id);
            },
        }),
        getNotificationsMapForMenu: (menu: NavigationLink[]) => {
            return menu.reduce((acc, link) => {
                acc[link.path] = getNotificationCountForPath(
                    link.path,
                    notifications
                );
                return acc;
            }, {} as Record<string, number>);
        },
        getNotificationCountForPath: (path: string) =>
            getNotificationCountForPath(path, notifications),
    };
};
