import { Control, Controller } from 'react-hook-form';
import { Switch } from '@/lib/shared/components/ui';
import { ProviderProfile } from '@/lib/shared/types';
import { Tooltip, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { InfoOutlined } from '@mui/icons-material';

interface ToggleInputProps {
    control: Control<ProviderProfile.ProviderProfile>;
    disabled?: boolean;
}

export const OffersInPersonToggle = ({
    control,
    disabled,
}: ToggleInputProps) => (
    <Controller
        control={control}
        name="offersInPerson"
        render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error, isTouched },
        }) => (
            <Switch
                id="offersInPerson"
                displayText="Offer in-person sessions?"
                {...{
                    disabled,
                    onChange,
                    onBlur,
                    value,
                    checked: value,
                    name,
                }}
            />
        )}
    />
);

export const OffersVirtualToggle = ({
    control,
    disabled,
}: ToggleInputProps) => (
    <Controller
        control={control}
        name="offersVirtual"
        render={({ field: { onChange, onBlur, value, name } }) => (
            <Switch
                id="offersInPerson"
                displayText="Offer virtual sessions?"
                {...{
                    onChange,
                    onBlur,
                    value,
                    checked: value,
                    name,
                    disabled,
                }}
            />
        )}
    />
);

export const OffersChat = ({ control, disabled }: ToggleInputProps) => (
    <Controller
        control={control}
        name="offersChat"
        render={({ field: { onChange, onBlur, value, name } }) => (
            <Switch
                id="offersChat"
                displayText={
                    <Box display="flex" alignItems="center">
                        Do you want to offer in-app messaging?{' '}
                        <ChatTooltip title="In-app messaging allows you to communicate inside the Therify App with your clients">
                            <InfoOutlined fontSize="small" />
                        </ChatTooltip>
                    </Box>
                }
                {...{
                    onChange,
                    onBlur,
                    value,
                    checked: value,
                    name,
                    disabled,
                }}
            />
        )}
    />
);

const ChatTooltip = styled(Tooltip)(({ theme }) => ({
    marginLeft: 2,
    fontSize: '0.8rem',
    display: 'none',
    [theme.breakpoints.up('md')]: {
        display: 'inline-block',
    },
}));

export const OffersMedicationManagement = ({
    control,
    disabled,
}: ToggleInputProps) => (
    <Controller
        control={control}
        name="offersMedicationManagement"
        render={({ field: { onChange, onBlur, value, name } }) => (
            <Switch
                id="offersMedicationManagement"
                displayText="Offer medication managment?"
                {...{
                    onChange,
                    onBlur,
                    value,
                    checked: value,
                    name,
                    disabled,
                }}
            />
        )}
    />
);
export const OffersPhoneConsultations = ({
    control,
    disabled,
}: ToggleInputProps) => (
    <Controller
        control={control}
        name="offersPhoneConsultations"
        render={({ field: { onChange, onBlur, value, name } }) => (
            <Switch
                id="offersPhoneConsultations"
                displayText="Offer free 15 min phone consultation?"
                {...{
                    onChange,
                    onBlur,
                    value,
                    checked: value,
                    name,
                    disabled,
                }}
            />
        )}
    />
);
