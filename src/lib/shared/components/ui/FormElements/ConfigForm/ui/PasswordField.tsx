import { z } from 'zod';
import { Path, UseFormReturn } from 'react-hook-form';
import { PasswordInput } from '@/lib/shared/components/ui';
import { PasswordInput as PasswordFieldType } from '../types';

export function PasswordField<FormSchema extends z.ZodType>({
    register,
    getFieldState,
    getValues,
    field,
}: {
    field: PasswordFieldType<FormSchema>;
} & UseFormReturn<FormSchema, any>) {
    const statePath = field.statePath as Path<FormSchema>;
    const { error } = getFieldState(statePath);
    const { ref, ...registerProps } = register(statePath, {
        ...field.validation,
        required:
            (field.required && field.validation?.required) ??
            'Field is required.',
        validate: {
            ...(field.validation?.validate ?? {}),
            ...(field.confirmationStatePath && {
                confirmation: (value) => {
                    if (!field.confirmationStatePath) {
                        return true;
                    }
                    const confirmationValue = getValues(
                        field.confirmationStatePath
                    );
                    if (value !== confirmationValue) {
                        return 'Passwords do not match.';
                    }
                    return true;
                },
            }),
        },
    });

    return (
        <PasswordInput
            allowShowPassword={field.allowShowPassword ?? true}
            required={field.required}
            id={field.id}
            label={field.label}
            helperText={field.helperText}
            errorMessage={error?.message}
            inputRef={ref}
            {...registerProps}
            wrapperSx={{
                width: '100%',
            }}
        />
    );
}
