import { ReactNode, useContext, useEffect, useState } from 'react';
import { FirebaseClient, TherifyUser } from '@/lib/shared/context';
import { Notification } from '@/lib/shared/types';
import { handleNotifications } from './handle-notifications-change';
import { useInAppPresence } from '../hooks';
import { Context } from './Context';
import {
    clearNotificationsFactory,
    clearActionlessNotificationsFactory,
    markNotificationAsViewedFactory,
} from './methods';

export const Provider = ({ children }: { children: ReactNode }) => {
    const { firebase } = useContext(FirebaseClient.Context);
    const userId = firebase?.getSignedInUserId();
    useInAppPresence({ userId, firebase });

    const [notifications, setNotifications] = useState<
        Notification.InApp.PersitedType[]
    >([]);
    const notificationsPath = `in-app-notifications/${userId}`;
    const isFirebaseAuthenticated = Boolean(firebase?.isAuthenticated());
    const [shouldListenToNotifications, setShouldListenToNotifications] =
        useState(Boolean(firebase?.isAuthenticated() && userId));

    const clearNotifications = clearNotificationsFactory({
        firebase,
        notificationsPath,
        notifications,
        clearLocalNotifications: () => setNotifications([]),
    });

    const clearActionlessNotifications = clearActionlessNotificationsFactory({
        firebase,
        notificationsPath,
        notifications,
    });

    const markNotificationAsViewed = markNotificationAsViewedFactory({
        firebase,
        notificationsPath,
    });

    useEffect(() => {
        setShouldListenToNotifications(!!userId && isFirebaseAuthenticated);
    }, [userId, isFirebaseAuthenticated]);

    useEffect(() => {
        if (shouldListenToNotifications && !!firebase) {
            const unsubscribe = firebase.addListener(
                notificationsPath,
                (value) => {
                    const notifications = handleNotifications(value);
                    setNotifications(notifications);
                }
            );
            return () => {
                unsubscribe();
            };
        }
    }, [shouldListenToNotifications, notificationsPath, userId, firebase]);
    return (
        <Context.Provider
            value={{
                clearNotifications,
                clearActionlessNotifications,
                markNotificationAsViewed,
                notifications,
            }}
        >
            {children}
        </Context.Provider>
    );
};
