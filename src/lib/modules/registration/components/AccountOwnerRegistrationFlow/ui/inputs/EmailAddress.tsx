import { Controller, Control } from 'react-hook-form';
import { RegisterAccountOwner } from '@/lib/modules/registration/features';
import { Input, FormValidation } from '@/lib/shared/components/ui';
import { TEST_IDS } from './testIds';

interface EmailInputProps {
    control: Control<RegisterAccountOwner.Input>;
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
