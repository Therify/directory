import { Controller, Control } from 'react-hook-form';
import { FormValidation } from '@/components/ui';
import { DatePicker } from '@/components/ui';

import { ProviderCredential } from '@/lib/types';

interface InputProps {
    control: Control<ProviderCredential.ProviderCredential>;
    defaultValue?: string;
    disabled?: boolean;
}

export const ExpirationDateInput = ({
    control,
    disabled,
    defaultValue,
}: InputProps) => (
    <Controller
        control={control}
        name="expirationDate"
        defaultValue={defaultValue}
        rules={{
            required: true,
            validate: {
                [FormValidation.DateValidationType.IsValid]: (date) =>
                    !!date && FormValidation.validateDateIsValid(date),
                [FormValidation.DateValidationType.IsFuture]: (date) =>
                    !!date &&
                    FormValidation.validateIsFutureDate(new Date(date)),
            },
        }}
        render={({
            field: { onChange, value, onBlur },
            fieldState: { error },
        }) => (
            <DatePicker
                label="Expiration Date"
                onChange={(date) => {
                    if (date === null) return onChange(undefined);

                    onChange(
                        FormValidation.validateDateIsValid(date)
                            ? date?.toISOString()
                            : date?.toDateString()
                    );
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
