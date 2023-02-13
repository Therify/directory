import { Controller, Control } from 'react-hook-form';
import { FormValidation } from '@/lib/shared/components/ui';
import { DatePicker } from '@/lib/shared/components/ui';
import { ProviderProfile } from '@/lib/shared/types';

interface PraticeStartInputProps {
    control: Control<ProviderProfile.ProviderProfile>;
    disabled?: boolean;
}

export const PracticeStartDateInput = ({
    control,
    disabled,
}: PraticeStartInputProps) => (
    <Controller
        control={control}
        name="practiceStartDate"
        rules={{
            required: true,
            validate: {
                [FormValidation.DateValidationType.IsValid]: (date) =>
                    !!date && FormValidation.validateDateIsValid(date),
                [FormValidation.DateValidationType.IsPast]: (date) =>
                    !!date && FormValidation.validateIsPastDate(date),
            },
        }}
        render={({
            field: { onChange, value, onBlur },
            fieldState: { error },
        }) => (
            <DatePicker
                required
                label="When did you begin practicing?"
                helperText="Feel free to approximate"
                onChange={(date) => {
                    if (date === null) return onChange(undefined);

                    onChange(
                        FormValidation.validateDateIsValid(date)
                            ? date?.toISOString()
                            : date?.toDateString() // "Invalid Date" string literal
                    );
                }}
                errorMessage={
                    value !== null
                        ? FormValidation.getDateValidationErrorMessage(
                              error?.type as FormValidation.DateValidationType
                          )
                        : undefined
                }
                onClose={onBlur}
                onBlur={onBlur}
                value={new Date(value) ?? null}
                disabled={disabled}
            />
        )}
    />
);
