import { Control, Controller } from 'react-hook-form';
import { Switch } from '@/components/ui';
import { ProviderProfile } from '@/lib/types/providerProfile';

interface ToggleInputProps {
    control: Control<ProviderProfile>;
    defaultValue?: boolean;
    disabled?: boolean;
}

export const OffersInPersonToggle = ({
    control,
    defaultValue = false,
    disabled,
}: ToggleInputProps) => (
    <Controller
        control={control}
        name="offersInPerson"
        defaultValue={defaultValue}
        rules={{
            required: true,
        }}
        render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error, isTouched },
        }) => (
            <Switch
                id="offersInPerson"
                displayText="Offer in-person sessions?"
                // errorMessage={
                //     isTouched
                //         ? FormValidation.getNameValidationErrorMessage(
                //               error?.type as FormValidation.NameValidationType,
                //               'First Name'
                //           )
                //         : undefined
                // }
                {...{
                    disabled,
                    onChange,
                    onBlur,
                    value,
                    name,
                }}
            />
        )}
    />
);

export const OffersVirtualToggle = ({
    control,
    defaultValue = false,
    disabled,
}: ToggleInputProps) => (
    <Controller
        control={control}
        name="offersVirtual"
        defaultValue={defaultValue}
        rules={{
            required: true,
        }}
        render={({ field: { onChange, onBlur, value, name } }) => (
            <Switch
                id="offersInPerson"
                displayText="Offer virtual sessions?"
                {...{
                    onChange,
                    onBlur,
                    value,
                    name,
                    disabled,
                }}
            />
        )}
    />
);
export const OffersMedicationManagement = ({
    control,
    defaultValue = false,
    disabled,
}: ToggleInputProps) => (
    <Controller
        control={control}
        name="offersMedicationManagement"
        defaultValue={defaultValue}
        rules={{
            required: true,
        }}
        render={({ field: { onChange, onBlur, value, name } }) => (
            <Switch
                id="offersMedicationManagement"
                displayText="Offer medication managment?"
                {...{
                    onChange,
                    onBlur,
                    value,
                    name,
                    disabled,
                }}
            />
        )}
    />
);
export const OffersPhoneConsultations = ({
    control,
    defaultValue = false,
    disabled,
}: ToggleInputProps) => (
    <Controller
        control={control}
        name="offersPhoneConsultations"
        defaultValue={defaultValue}
        rules={{
            required: true,
        }}
        render={({ field: { onChange, onBlur, value, name } }) => (
            <Switch
                id="offersPhoneConsultations"
                displayText="Offer free phone consultation?"
                {...{
                    onChange,
                    onBlur,
                    value,
                    name,
                    disabled,
                }}
            />
        )}
    />
);
