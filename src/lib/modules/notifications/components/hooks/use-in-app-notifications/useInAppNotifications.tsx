import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { InAppNotificationsContext } from '../../context';
import { getNotificationCountForPath } from './methods';
import { handleActionFactory } from './methods/handle-action/handleAction';
import { NavigationLink } from '@/lib/sitemap';

export const useInAppNotifications = () => {
    const {
        notifications,
        clearNotifications,
        markNotificationAsViewed,
        clearActionlessNotifications,
    } = useContext(InAppNotificationsContext.Context);
    const router = useRouter();
    const [isDisplayingNotifications, setIsDisplayingNotifications] =
        useState(false);

    return {
        notifications,
        clearNotifications,
        clearActionlessNotifications,
        display: {
            isOpen: isDisplayingNotifications,
            close: () => setIsDisplayingNotifications(false),
            open: () => setIsDisplayingNotifications(true),
        },
        unreadCount: notifications.filter((n) => !n.isViewed).length,
        handleAction: handleActionFactory({
            navigateTo: router.push,
            callback: ({ id }) => {
                setIsDisplayingNotifications(false);
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
