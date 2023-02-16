import { Alert } from '@/lib/shared/types';
import { createContext } from 'react';

export type CreateAlert = (alert: Omit<Alert.Type, 'id'>) => void;

interface AlertContext {
    alerts: Alert.Type[];
    createAlert: CreateAlert;
    clearAlerts: () => void;
}
export const Context = createContext<AlertContext>({
    alerts: [],
    createAlert: () => {},
    clearAlerts: () => {},
});
