import {
    Controller,
    DeepPartial,
    useForm,
    UseFormReset,
} from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { Switch, Checkbox, Button } from '@/lib/shared/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    NotificationsForm as NotificationsFormType,
    notificationsForm,
} from '../form';

interface NotificationsFormProps {
    onSubmit: (
        data: NotificationsFormType,
        resetForm: UseFormReset<NotificationsFormType>
    ) => void;
    defaultValues?: DeepPartial<NotificationsFormType>;
}

export const NotificationsForm = ({
    onSubmit,
    defaultValues,
}: NotificationsFormProps) => {
    const {
        control,
        watch,
        setValue,
        handleSubmit,
        reset,
        formState: { isDirty, isValid },
    } = useForm<NotificationsFormType>({
        mode: 'onChange',
        defaultValues,
        resolver: zodResolver(notificationsForm.schema),
    });

    const isEmailNotificationsOn = watch('isEmailNotificationsOn') ?? true;
    const handleEmailParentNotificationtoggle = (value: boolean) => {
        setValue('isEmailNotificationsOn', value);
        if (value) {
            setValue('email.newMessages', true);
            setValue('email.matchProgress', true);
            return;
        }
        setValue('email.newMessages', false);
        setValue('email.matchProgress', false);
    };

    return (
        <Form onSubmit={(e) => e.preventDefault()}>
            <Controller
                control={control}
                name="isEmailNotificationsOn"
                defaultValue={defaultValues?.isEmailNotificationsOn ?? true}
                render={({ field: { onBlur, value, name } }) => (
                    <Switch
                        onChange={(e) => {
                            handleEmailParentNotificationtoggle(
                                !!(e.target as unknown as { checked: boolean })
                                    ?.checked
                            );
                        }}
                        {...{
                            onBlur,
                            name,
                        }}
                        value={!!value}
                        checked={!!value}
                        displayText="Turn on/off email notifications"
                        sx={{ mb: 4 }}
                    />
                )}
            />
            {isEmailNotificationsOn && (
                <SubFields>
                    <Controller
                        control={control}
                        name="email.newMessages"
                        defaultValue={defaultValues?.email?.newMessages ?? true}
                        render={({
                            field: { onChange, onBlur, value, name },
                        }) => (
                            <Checkbox
                                displayText="New messages"
                                color="primary"
                                checked={!!value}
                                value={!!value}
                                {...{
                                    onChange,
                                    onBlur,
                                    name,
                                }}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="email.matchProgress"
                        defaultValue={
                            defaultValues?.email?.matchProgress ?? true
                        }
                        render={({
                            field: { onChange, onBlur, value, name },
                        }) => (
                            <Checkbox
                                checked={!!value}
                                value={!!value}
                                {...{
                                    onChange,
                                    onBlur,
                                    name,
                                }}
                                displayText="Match progress"
                                color="primary"
                            />
                        )}
                    />
                </SubFields>
            )}
            <Button
                disabled={!isValid}
                onClick={handleSubmit((data) => onSubmit(data, reset))}
            >
                Save changes
            </Button>
        </Form>
    );
};
const Form = styled('form')({
    width: '100%',
    maxWidth: 600,
    display: 'flex',
    flexDirection: 'column',
});

const SubFields = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(4),
}));
