import { Control, Controller } from 'react-hook-form';
import { Switch } from '@/lib/shared/components/ui';
import { ProviderProfile } from '@/lib/shared/types';

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
                displayText="Do you want to offer chat?"
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
