import { createContext } from 'react';
import { Notification } from '@/lib/types';

interface IContext {
    notifications: Notification.InApp.PersitedType[];
    clearNotifications: () => Promise<void>;
    clearActionlessNotifications: () => Promise<void>;
    markNotificationAsViewed: (notificationId: string) => Promise<void>;
}

export const Context = createContext<IContext>({
    notifications: [],
    clearNotifications: async () => {
        throw new Error('clearNotifications not initialized');
    },
    clearActionlessNotifications: async () => {
        throw new Error('clearActionlessNotifications not initialized');
    },
    markNotificationAsViewed: async () => {
        throw new Error('markNotificationAsViewed not initialized');
    },
});
