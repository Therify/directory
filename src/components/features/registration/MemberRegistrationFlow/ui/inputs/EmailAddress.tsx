import { Controller, Control } from 'react-hook-form';
import { RegisterMember } from '@/lib/features/registration';
import { Input, FormValidation } from '@/components/ui';
import { TEST_IDS } from './testIds';

interface EmailInputProps {
    control: Control<RegisterMember.Input>;
    defaultValue?: string;
    isEmailUnique?: boolean;
    disabled?: boolean;
    helperText?: string;
}

export const EmailAddressInput = ({
    control,
    defaultValue = '',
    isEmailUnique,
    disabled,
    helperText,
}: EmailInputProps) => (
    <Controller
        control={control}
        name="emailAddress"
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
                    label="Email"
                    errorMessage={
                        shouldShowErrorMessage ? errorMessage : undefined
                    }
                    autoComplete="email"
                    data-testid={TEST_IDS.EMAIL_ADDRESS}
                    type="email"
                    disabled={disabled}
                    helperText={helperText}
                    {...{
                        onChange,
                        onBlur,
                        value,
                        name,
                    }}
                />
            );
        }}
    />
);
