import { ReactNode, useEffect, useState } from 'react';
nt
import { Context, CreateAlert } from './Context';
import { Alert } from '../../types';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const Provider = ({ children }: { children: ReactNode }) => {
    const [alerts, setAlerts] = useState<Alert.Type[]>([]);
    const [alertTimeoutMap, setAlertTimeoutMap] = useState<Record<string, number>>({});
    const removeAlert = (id: string) => {
        setAlerts((alerts) => alerts.filter((alert) => alert.id !== id));
    const createAlert: CreateAlert = (alert) => {
        const id = createRandomId();
        const alertWithId = { ...alert, id };
        setAlerts((alerts) => [...alerts, alert]);
        setAlertMap((alertMap) => ({
            ...alertMap,
            [alert.id]: alert,
        }));
        if (!alert.requireInteraction) {
            setTimeout(() => {
                removeAlert(id);
            }, 5000);
        }
        return id;
    };

    return (
        <Context.Provider value={{}}>
            <>
                {children}
                <AlertContainer />
            </>
        </Context.Provider>
    );
};

const AlertContainer = styled(Box)(({ theme }) => ({
    position: 'fixed',
    bottom: theme.spacing(20),
    margin: 'auto',
}));

const createRandomId = () => Math.random().toString(36).substring(2);
