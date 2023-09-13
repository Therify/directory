import { UseFormRegister, UseFormGetFieldState } from 'react-hook-form';
import { RegisterMember } from '@/lib/modules/registration/features/v3';
import { Input, FormValidation } from '@/lib/shared/components/ui';
import { TEST_IDS } from './testIds';

interface EmailInputProps {
    registerInput: UseFormRegister<RegisterMember.Input>;
    getFieldState: UseFormGetFieldState<RegisterMember.Input>;
    defaultValue?: string;
    isEmailUnique?: boolean;
    disabled?: boolean;
    helperText?: string;
}

export const EmailAddressInput = ({
    registerInput,
    getFieldState,
    isEmailUnique,
    disabled,
    helperText,
}: EmailInputProps) => {
    const { isTouched, error } = getFieldState('user.emailAddress');
    const shouldShowErrorMessage = isTouched || isEmailUnique === false;
    const uniquenessError =
        isEmailUnique === false
            ? FormValidation.EmailValidationType.IsUnique
            : undefined;
    const errorType =
        (error?.type as FormValidation.EmailValidationType) ?? uniquenessError;

    const errorMessage =
        FormValidation.getEmailValidationErrorMessage(errorType);

    return (
        <Input
            required
            id="emailAddress"
            label="Email"
            errorMessage={shouldShowErrorMessage ? errorMessage : undefined}
            autoComplete="email"
            data-testid={TEST_IDS.EMAIL_ADDRESS}
            type="email"
            disabled={disabled}
            helperText={helperText}
            {...registerInput('user.emailAddress', {
                required: true,
            })}
        />
    );
};
