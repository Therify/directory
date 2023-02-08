import { Controller, Control } from 'react-hook-form';
import { FormValidation } from '@/components/ui';
import { DatePicker } from '@/components/ui';
import { ProviderProfile } from '@/lib/types/providerProfile';

interface PraticeStartInputProps {
    control: Control<ProviderProfile>;
    defaultValue?: Date;
    disabled?: boolean;
}

export const PracticeStartDateInput = ({
    control,
    disabled,
    defaultValue = new Date(),
}: PraticeStartInputProps) => (
    <Controller
        control={control}
        name="practiceStartDate"
        defaultValue={defaultValue}
        rules={{
            required: true,
            validate: {
                [FormValidation.DateValidationType.IsValid]: (date) =>
                    !!date && FormValidation.validateDateIsValid(date),
            },
        }}
        render={({
            field: { onChange, value, onBlur },
            fieldState: { error, isTouched },
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
                            : date?.toDateString()
                    );
                }}
                errorMessage={
                    isTouched
                        ? FormValidation.getDateValidationErrorMessage(
                              error?.type as FormValidation.DateValidationType,
                              {
                                  minimumAge: 18,
                              }
                          )
                        : undefined
                }
                onBlur={onBlur}
                value={value ? new Date(value) : new Date()}
                disabled={disabled}
            />
        )}
    />
);
