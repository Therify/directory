import { Controller, Control, FieldError } from 'react-hook-form';
import { RegisterProvider } from '@/lib/features/registration';
import { PasswordInput as Input, FormValidation } from '@/components/ui';
import { TEST_IDS } from './testIds';
import React, { useEffect } from 'react';

interface PasswordConfirmInputProps {
    control: Control<RegisterProvider.Input['providerDetails']>;
    password: string;
}

export const PasswordConfirmationInput = ({
    control,
    password,
}: PasswordConfirmInputProps) => {
    return (
        <Controller
            control={control}
            name="confirmPassword"
            defaultValue=""
            rules={{
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
            }}
            render={({
                field: { onChange, onBlur, value, name },
                fieldState: { error, isTouched },
            }) => (
                <InputWithPasswordWatcher
                    {...{
                        isTouched,
                        error,
                        password,
                        onChange,
                        onBlur,
                        value,
                        name,
                    }}
                />
            )}
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
    value: unknown;
    name?: string;
}) => {
    useEffect(() => {
        // This is a hack to force the password confirmation input to revalidate
        if (fieldProps.onChange)
            fieldProps.onChange({
                target: { value: fieldProps.value },
            } as unknown as React.ChangeEvent<HTMLInputElement>);
    }, [fieldProps, password]);
    return (
        <Input
            allowShowPassword
            required
            fullWidth
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
