import { ReactNode, useContext, useEffect, useState } from 'react';
import { FirebaseClient, TherifyUser } from '@/lib/shared/context';
import { Notification } from '@/lib/shared/types';
import { handleNotifications } from './handle-notifications-change';
import { Context } from './Context';
import {
    clearNotificationsFactory,
    clearActionlessNotificationsFactory,
    markNotificationAsViewedFactory,
} from './methods';

export const Provider = ({ children }: { children: ReactNode }) => {
    const { user } = useContext(TherifyUser.Context);
    const { firebase } = useContext(FirebaseClient.Context);
    const [notifications, setNotifications] = useState<
        Notification.InApp.PersitedType[]
    >([]);
    const notificationsPath = `in-app-notifications/${user?.userId}`;
    const isFirebaseAuthenticated = Boolean(firebase?.isAuthenticated());
    const [shouldListenToNotifications, setShouldListenToNotifications] =
        useState(Boolean(firebase?.isAuthenticated() && user?.userId));

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
        setShouldListenToNotifications(
            !!user?.userId && isFirebaseAuthenticated
        );
    }, [user?.userId, isFirebaseAuthenticated]);

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
    }, [
        shouldListenToNotifications,
        notificationsPath,
        user?.userId,
        firebase,
    ]);
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