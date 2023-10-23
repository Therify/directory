import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Paragraph, Caption, FormRenderer } from '@/lib/shared/components/ui';
import { NotificationsForm, notificationsForm } from './form';
import { DeepPartial, UseFormReset } from 'react-hook-form';

interface NotificationsViewProps {
    onUpdateNotifications: (
        data: NotificationsForm,
        resetForm: UseFormReset<NotificationsForm>
    ) => void;
    defaultValues?: DeepPartial<NotificationsForm>;
}
export const NotificationsView = ({
    onUpdateNotifications,
    defaultValues,
}: NotificationsViewProps) => {
    console.log('notificationsForm.config', notificationsForm.config);
    return (
        <Container>
            <Paragraph bold>Notifications</Paragraph>
            <Caption secondary marginBottom={8}>
                Send me an email when
            </Caption>

            <FormRenderer
                validationSchema={notificationsForm.schema}
                config={notificationsForm.config}
                defaultValues={defaultValues}
                onSubmit={onUpdateNotifications}
                sx={{
                    maxWidth: 600,
                    '& > div': {
                        padding: 0,
                    },
                }}
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
