import { Controller, Control } from 'react-hook-form';
import { FormValidation } from '@/lib/shared/components/ui';
import { DatePicker } from '@/lib/shared/components/ui';
import { RegisterAccountOwner } from '@/lib/modules/registration/features';

interface DOBInputProps {
    control: Control<RegisterAccountOwner.Input>;
    defaultValue?: string;
}

export const DateOfBirthInput = ({
    control,
    defaultValue = '',
}: DOBInputProps) => (
    <Controller
        control={control}
        name="dateOfBirth"
        defaultValue={defaultValue}
        rules={{
            required: true,
            validate: {
                [FormValidation.DateValidationType.IsValid]: (date) =>
                    FormValidation.validateDateIsValid(date),
                [FormValidation.DateValidationType.MaxDate]: (date) =>
                    FormValidation.validateMaximumDate(
                        new Date(date),
                        new Date()
                    ),
                [FormValidation.DateValidationType.MinDate]: (date) =>
                    FormValidation.validateMinimumDate(
                        new Date(date),
                        new Date(1900, 0, 1)
                    ),
                [FormValidation.DateValidationType.MinAge]: (date) =>
                    FormValidation.validateMinimumAge(new Date(date), 18),
            },
        }}
        render={({
            field: { onChange, value, onBlur },
            fieldState: { error, isTouched },
        }) => (
            <DatePicker
                required
                label="Date of Birth"
                autoComplete="bday"
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
                value={new Date(value)}
            />
        )}
    />
);
