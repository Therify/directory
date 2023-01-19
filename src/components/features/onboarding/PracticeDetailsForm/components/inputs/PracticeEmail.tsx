import { Controller, Control } from 'react-hook-form';
import { HandlePracticeOnboarding } from '@/lib/features/onboarding';
import { Input, FormValidation } from '@/components/ui';

interface PracticeEmailInputProps {
    control: Control<HandlePracticeOnboarding.Input>;
    defaultValue?: string;
    isEmailUnique?: boolean;
    disabled?: boolean;
    helperText?: string;
    onInputBlur: () => void;
}

export const PracticeEmailInput = ({
    control,
    defaultValue = '',
    isEmailUnique,
    disabled,
    helperText,
    onInputBlur,
}: PracticeEmailInputProps) => (
    <Controller
        control={control}
        name="email"
        rules={{
            required: true,
            validate: {
                [FormValidation.EmailValidationType.IsValid]:
                    FormValidation.isValidEmail,
            },
        }}
        defaultValue={defaultValue}
        render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error, isTouched },
        }) => {
            const shouldShowErrorMessage = isTouched || isEmailUnique === false;
            const uniqunessError =
                isEmailUnique === false
                    ? FormValidation.EmailValidationType.IsUnique
                    : undefined;
            const errorType =
                (error?.type as FormValidation.EmailValidationType) ??
                uniqunessError;

            const errorMessage =
                FormValidation.getEmailValidationErrorMessage(errorType);
            return (
                <Input
                    required
                    fullWidth
                    id="emailAddress"
                    label="Primary contact email"
                    errorMessage={
                        shouldShowErrorMessage ? errorMessage : undefined
                    }
                    autoComplete="email"
                    type="email"
                    disabled={disabled}
                    helperText={helperText}
                    onBlur={() => {
                        onBlur();
                        onInputBlur();
                    }}
                    {...{
                        onChange,
                        value,
                        name,
                    }}
                />
            );
        }}
    />
);
