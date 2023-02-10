import { Control, Controller } from 'react-hook-form';
import { Switch } from '@/components/ui';
import { ProviderProfile } from '@/lib/types/providerProfile';

interface ToggleInputProps {
    control: Control<ProviderProfile>;
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
    disabled,
}: ToggleInputProps) => (
    <Controller
        control={control}
        name="offersVirtual"
        render={({ field: { onChange, onBlur, value, name } }) => {
            console.log({ value });
            return (
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
            );
        }}
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
