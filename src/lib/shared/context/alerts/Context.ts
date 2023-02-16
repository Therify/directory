import { trpc } from '@/lib/shared/utils/trpc';
import { createContext, ReactNode } from 'react';
import { Alert } from '../../types';

export type CreateAlertPayload = Omit<Alert.Type, 'id'> & {
    icon?: ReactNode;
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
