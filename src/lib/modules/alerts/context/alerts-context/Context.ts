import { Alert } from '@/lib/shared/types';
import { createContext } from 'react';

type CreateAlertPayload = Omit<Alert.Type, 'id'> & {
    durationSeconds?: number;
};

export type CreateAlert = (alert: CreateAlertPayload) => void;

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
