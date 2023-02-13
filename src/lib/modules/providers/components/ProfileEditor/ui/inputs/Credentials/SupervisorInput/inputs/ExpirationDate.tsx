import { Controller, Control } from 'react-hook-form';
import { FormValidation } from '@/lib/shared/components/ui';
import { DatePicker } from '@/lib/shared/components/ui';
import { ProviderProfile, ProviderSupervisor } from '@/lib/shared/types';

interface InputProps {
    control: Control<ProviderProfile.ProviderProfile>;
    defaultValue?: string;
    disabled?: boolean;
    storeLocalData: (
        key:
            | keyof ProviderSupervisor.ProviderSupervisor
            | keyof ProviderSupervisor.ProviderSupervisor['supervisorLicense'],
        value: string
    ) => void;
}

export const ExpirationDateInput = ({
    control,
    disabled,
    defaultValue,
    storeLocalData,
}: InputProps) => (
    <Controller
        control={control}
        name="supervisor.supervisorLicense.expiration"
        defaultValue={defaultValue}
        rules={{
            required: true,
            validate: {
                [FormValidation.DateValidationType.IsValid]: (expiration) =>
                    FormValidation.validateDateIsValid(expiration),
                [FormValidation.DateValidationType.IsFuture]: (expiration) =>
                    FormValidation.validateIsFutureDate(new Date(expiration)),
            },
        }}
        render={({
            field: { onChange, value, onBlur },
            fieldState: { error },
        }) => (
            <DatePicker
                label="License Expiration"
                required
                onChange={(date) => {
                    if (date === null) return onChange(undefined);
                    const payload = FormValidation.validateDateIsValid(date)
                        ? date?.toISOString()
                        : date?.toDateString();
                    onChange(payload);
                    storeLocalData('expiration', payload);
                }}
                errorMessage={
                    FormValidation.validateDateIsValid(value)
                        ? FormValidation.getDateValidationErrorMessage(
                              error?.type as FormValidation.DateValidationType
                          )
                        : undefined
                }
                onBlur={onBlur}
                value={value ? new Date(value) : null}
                disabled={disabled}
            />
        )}
    />
);
