import { Controller, Control } from 'react-hook-form';
import { RegisterMember } from '@/lib/modules/registration/features';
import {
    PasswordInput as Input,
    FormValidation,
} from '@/lib/shared/components/ui';
import { TEST_IDS } from './testIds';

interface PasswordInputProps {
    control: Control<RegisterMember.Input>;
}

export const PasswordInput = ({ control }: PasswordInputProps) => (
    <Controller
        control={control}
        name="password"
        defaultValue=""
        rules={{
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
        }}
        render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error, isTouched },
        }) => (
            <Input
                allowShowPassword
                required
                fullWidth
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
                {...{
                    onChange,
                    onBlur,
                    value,
                    name,
                }}
            />
        )}
    />
);
