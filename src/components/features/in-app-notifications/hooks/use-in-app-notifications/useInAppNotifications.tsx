import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Notification } from '@/lib/types';
import { InAppNotificationsContext } from '../../context';
import {
    clearNotificationsFactory,
    getNotificationCountForPath,
    markNotificationAsViewedFactory,
    clearActionlessNotificationsFactory,
} from './methods';
import { handleActionFactory } from './methods/handle-action/handleAction';
import { FirebaseClient } from '@/lib/context';
import { NavigationLink } from '@/lib/sitemap';

export const useInAppNotifications = () => {
    const { notificationsPath, notifications } = useContext(
        InAppNotificationsContext.Context
    );
    // Should this happen in the notification context?
    const { firebase } = useContext(FirebaseClient.Context);
    const router = useRouter();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const markNotificationAsViewed = markNotificationAsViewedFactory({
        firebase,
        notificationsPath,
    });

    // const clearNotifications = clearNotificationsFactory({
    //     firebase,
    //     notificationsPath,
    //     notifications,
    //     clearLocalNotifications: () => setNotifications([]),
    // });

    return {
        notifications,
        // clearNotifications,
        clearActionlessNotifications: clearActionlessNotificationsFactory({
            firebase,
            notificationsPath,
            notifications,
        }),
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
