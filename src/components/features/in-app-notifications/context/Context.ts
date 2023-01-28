import { createContext } from 'react';
import { Notification } from '@/lib/types';

interface IContext {
    notifications: Notification.InApp.PersitedType[];
    notificationsPath?: string;
}

export const Context = createContext<IContext>({
    notifications: [],
    notificationsPath: undefined,
});
