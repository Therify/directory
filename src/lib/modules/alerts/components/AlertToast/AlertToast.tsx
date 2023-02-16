import {
    Alert as AlertUi,
    CenteredContainer,
} from '@/lib/shared/components/ui';
import { Alert } from '@/lib/shared/types';
import {
    ErrorOutlineRounded,
    InfoOutlined,
    WarningAmberRounded,
    CheckCircleOutlineOutlined,
} from '@mui/icons-material';

export interface AlertToastProps extends Omit<Alert.Type, 'id'> {
    onClose: () => void;
}

export const AlertToast = ({
    type,
    title,
    message,
    onClose,
}: AlertToastProps) => (
    <AlertUi
        type={type}
        icon={<CenteredContainer>{getIcon(type)}</CenteredContainer>}
        title={title}
        message={message}
        onClose={onClose}
        sx={{ marginBottom: 2 }}
    />
);

const getIcon = (type: Alert.Type['type']) => {
    switch (type) {
        case 'success':
            return <CheckCircleOutlineOutlined />;
        case 'error':
            return <ErrorOutlineRounded />;
        case 'warning':
            return <WarningAmberRounded />;
        case 'info':
        default:
            return <InfoOutlined />;
    }
};
