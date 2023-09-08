import {
    FieldError,
    UseFormRegister,
    UseFormGetFieldState,
} from 'react-hook-form';
import { RegisterMember } from '@/lib/modules/registration/features/v3';
import {
    PasswordInput as Input,
    FormValidation,
} from '@/lib/shared/components/ui';
import { TEST_IDS } from './testIds';
import React, { useEffect } from 'react';

interface PasswordConfirmInputProps {
    registerInput: UseFormRegister<RegisterMember.Input>;
    getFieldState: UseFormGetFieldState<RegisterMember.Input>;
    password: string;
}

export const PasswordConfirmationInput = ({
    registerInput,
    getFieldState,
    password,
}: PasswordConfirmInputProps) => {
    const { isTouched, error } = getFieldState('user.confirmPassword');
    return (
        <InputWithPasswordWatcher
            {...{
                isTouched,
                error,
                password,
                ...registerInput('user.confirmPassword', {
                    required: true,
                    validate: {
                        [FormValidation.PasswordValidationType.Confirmation]: (
                            confirmPassword
                        ) =>
                            FormValidation.validatePasswordConfirmation(
                                password,
                                confirmPassword
                            ),
                    },
                }),
            }}
        />
    );
};

const InputWithPasswordWatcher = ({
    error,
    isTouched,
    password,
    ...fieldProps
}: {
    password: string;
    isTouched: boolean;
    error?: FieldError;
    blur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    name?: string;
}) => {
    // useEffect(() => {
    //     // This is a hack to force the password confirmation input to revalidate
    //     if (fieldProps.onChange)
    //         fieldProps.onChange({
    //             target: { value: fieldProps.value },
    //         } as unknown as React.ChangeEvent<HTMLInputElement>);
    // }, [fieldProps, password]);
    return (
        <Input
            allowShowPassword
            required
            id="confirmPassword"
            label="Confirm Password"
            data-testid={TEST_IDS.CONFIRM_PASSWORD}
            autoComplete="new-password"
            errorMessage={
                isTouched
                    ? FormValidation.getPasswordValidationErrorMessage(
                          error?.type as FormValidation.PasswordValidationType
                      )
                    : undefined
            }
            wrapperSx={{
                marginBottom: 0,
            }}
            {...fieldProps}
        />
    );
};
