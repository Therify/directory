import { UseFormRegister, UseFormGetFieldState } from 'react-hook-form';
import { RegisterMember } from '@/lib/modules/registration/features/v3';
import {
    PasswordInput as Input,
    FormValidation,
} from '@/lib/shared/components/ui';
import { TEST_IDS } from './testIds';

interface PasswordInputProps {
    registerInput: UseFormRegister<RegisterMember.Input>;
    getFieldState: UseFormGetFieldState<RegisterMember.Input>;
}

export const PasswordInput = ({
    registerInput,
    getFieldState,
}: PasswordInputProps) => {
    const { isTouched, error } = getFieldState('user.password');
    return (
        <Input
            allowShowPassword
            required
            id="password"
            label="Password"
            data-testid={TEST_IDS.PASSWORD}
            helperText="Password must be at least 8 characters long, with at least one number, special character, lowercase letter, and uppercase letter."
            errorMessage={
                isTouched
                    ? FormValidation.getPasswordValidationErrorMessage(
                          error?.type as FormValidation.PasswordValidationType
                      )
                    : undefined
            }
            autoComplete="new-password"
            {...registerInput('user.password', {
                required: true,
                validate: {
                    [FormValidation.PasswordValidationType.MinLength]:
                        FormValidation.validatePasswordLength,
                    [FormValidation.PasswordValidationType.Number]:
                        FormValidation.validatePasswordHasNumber,
                    [FormValidation.PasswordValidationType.SpecialCharacters]:
                        FormValidation.validatePasswordHasSpecialCharacter,
                    [FormValidation.PasswordValidationType.LowerCase]:
                        FormValidation.validatePasswordHasLowercase,
                    [FormValidation.PasswordValidationType.UpperCase]:
                        FormValidation.validatePasswordHasUppercase,
                },
            })}
        />
    );
};
