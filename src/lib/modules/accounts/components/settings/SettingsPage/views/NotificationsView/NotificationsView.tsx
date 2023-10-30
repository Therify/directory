import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Paragraph, Caption } from '@/lib/shared/components/ui';
import { NotificationsForm as NotificationsFormType } from './form';
import { DeepPartial, UseFormReset } from 'react-hook-form';
import { NotificationsForm } from './ui/NotificationsForm';

interface NotificationsViewProps {
    onUpdateNotifications: (
        data: NotificationsFormType,
        resetForm: UseFormReset<NotificationsFormType>
    ) => void;
    defaultValues?: DeepPartial<NotificationsFormType>;
}
export const NotificationsView = ({
    onUpdateNotifications,
    defaultValues,
}: NotificationsViewProps) => {
    return (
        <Container>
            <Paragraph bold>Notifications</Paragraph>
            <Caption secondary marginBottom={8}>
                Send me an email when
            </Caption>

            <NotificationsForm
                defaultValues={defaultValues}
                onSubmit={onUpdateNotifications}
            />
        </Container>
    );
};

const Container = styled(Box)(({ theme }) => ({
    maxWidth: 600,
    padding: theme.spacing(14, 0, 10),
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(20, 0, 10),
    },
}));
