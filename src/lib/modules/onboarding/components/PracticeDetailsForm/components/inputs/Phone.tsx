import { Control, Controller } from 'react-hook-form';
import { FormValidation, Input } from '@/lib/shared/components/ui';
import { HandlePracticeOnboarding } from '@/lib/modules/onboarding/features';

interface PhoneNumberInputProps {
    control: Control<HandlePracticeOnboarding.Input>;
    defaultValue?: string;
    onInputBlur: () => void;
    disabled?: boolean;
}

export const PhoneNumberInput = ({
    control,
    defaultValue = '',
    onInputBlur,
    disabled,
}: PhoneNumberInputProps) => (
    <Controller
        control={control}
        name="phone"
        defaultValue={defaultValue}
        rules={{
            validate: {
                [FormValidation.Phone.PhoneValidationType.IsNumeric]: (
                    value
                ) => {
                    const shouldValidate = Boolean(value);
                    return shouldValidate
                        ? FormValidation.Phone.isNumeric(value ?? '')
                        : true;
                },
                [FormValidation.Phone.PhoneValidationType.ValidLength]: (
                    value
                ) => {
                    const shouldValidate = Boolean(value);
                    return shouldValidate
                        ? FormValidation.Phone.isValidLength(value ?? '', 10)
                        : true;
                },
            },
        }}
        render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error, isTouched },
        }) => (
            <Input
                fullWidth
                type="tel"
                id="phone"
                label="Phone"
                autoComplete="nope"
                errorMessage={
                    isTouched
                        ? FormValidation.Phone.getPhoneValidationErrorMessage(
                              error?.type as FormValidation.Phone.PhoneValidationType,
                              { length: 10 }
                          )
                        : undefined
                }
                onBlur={() => {
                    onBlur();
                    onInputBlur();
                }}
                {...{
                    onChange,
                    value,
                    name,
                    disabled,
                }}
            />
        )}
    />
);
