import { Alert as MuiAlert, AlertTitle, Box } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { ReactNode } from 'react';
import { Button, BUTTON_SIZE, BUTTON_TYPE } from '../Button';

export const ALERT_TYPE = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
} as const;

export type AlertType = typeof ALERT_TYPE[keyof typeof ALERT_TYPE];

interface AlertAction {
    displayText: string;
    onClick: () => void;
}

interface AlertProps {
    icon?: React.ReactNode | false;
    title: string;
    message?: ReactNode;
    type?: AlertType;
    onClose?: () => void;
    actions?: AlertAction[];
    sx?: SxProps<Theme>;
}
export const Alert = ({
    title,
    icon = false,
    message,
    type,
    onClose,
    actions,
    sx,
}: AlertProps) => {
    const alertType = type ?? ALERT_TYPE.INFO;
    return (
        <MuiAlert
            icon={icon}
            severity={alertType}
            onClose={onClose}
            sx={{
                fontSize: '1rem',
                '& .MuiAlert-message': {
                    ...(!message && { display: 'flex', alignItems: 'center' }),
                },
                ...sx,
            }}
        >
            <>
                <AlertTitle
                    style={{
                        ...(!message && !actions && { marginBottom: 0 }),
                    }}
                >
                    {title}
                </AlertTitle>
                {message}
                {actions && (
                    <Box>
                        {actions.map(({ displayText, onClick }, i) => (
                            //  TODO: Replace with Link component when it's available
                            <Button
                                key={i}
                                type={BUTTON_TYPE.TEXT}
                                size={BUTTON_SIZE.SMALL}
                                color={type}
                                onClick={onClick}
                            >
                                {displayText}
                            </Button>
                        ))}
                    </Box>
                )}
            </>
        </MuiAlert>
    );
};
