import { ReactNode, useState } from 'react';
import { Context, CreateAlert } from './Context';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Alert } from '@/lib/shared/types';
import { AlertManager } from '../../components/AlertManager';

export const Provider = ({ children }: { children: ReactNode }) => {
    const [alerts, setAlerts] = useState<Alert.Type[]>([]);
    const [alertTimeoutMap, setAlertTimeoutMap] = useState<
        Record<string, number>
    >({});

    const removeAlert = (id: string) => {
        if (typeof window !== 'undefined') {
            window.clearTimeout(alertTimeoutMap[id]);
        }
        setAlerts((alerts) => alerts.filter((alert) => alert.id !== id));
        setAlertTimeoutMap((alertTimeoutMap) => {
            const updatedMap = { ...alertTimeoutMap };
            delete updatedMap[id];
            return updatedMap;
        });
    };

    const createAlert: CreateAlert = (alert) => {
        if (typeof window === 'undefined') return;
        const alertWithId = { ...alert, id: createRandomId() };
        setAlerts((alerts) => [...alerts, alertWithId]);

        if (!alert.requireInteraction) {
            const timeout = window?.setTimeout(() => {
                removeAlert(alertWithId.id);
            }, 5000);

            setAlertTimeoutMap((alertTimeoutMap) => ({
                ...alertTimeoutMap,
                [alertWithId.id]: timeout,
            }));
        }
        return alertWithId.id;
    };

    const clearAlerts = () => {
        setAlerts([]);
        Object.values(alertTimeoutMap).forEach((timeout) => {
            if (typeof window !== 'undefined') {
                window.clearTimeout(timeout);
            }
        });
        setAlertTimeoutMap({});
    };

    return (
        <Context.Provider
            value={{
                createAlert,
                clearAlerts,
                alerts,
            }}
        >
            <>
                {children}
                <AlertContainer hasAlerts={alerts.length > 0}>
                    <AlertManager alerts={alerts} removeAlert={removeAlert} />
                </AlertContainer>
            </>
        </Context.Provider>
    );
};

const AlertContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'hasAlerts',
})<{ hasAlerts: boolean }>(({ theme, hasAlerts }) => {
    const headerHeight = '100px';
    return {
        position: 'fixed',
        bottom: theme.spacing(4),
        left: '10%',
        width: '80%',
        zIndex: hasAlerts ? theme.zIndex.snackbar : -1,
        margin: 'auto',
        [theme.breakpoints.up('md')]: {
            maxWidth: '280px',
            bottom: 'inherit',
            left: 'inherit',
            top: `calc(${headerHeight} + ${theme.spacing(6)})`,
            right: theme.spacing(6),
        },
    };
});

const createRandomId = () => Math.random().toString(36).substring(2);
