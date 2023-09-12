import { z } from 'zod';
import { Path, UseFormReturn } from 'react-hook-form';
import { PasswordInput } from '@/lib/shared/components/ui';
import { PasswordInput as PasswordFieldType } from '../types';

export function PasswordField<FormSchema extends z.ZodTypeAny>({
    register,
    getFieldState,
    getValues,
    field,
}: {
    field: PasswordFieldType;
} & UseFormReturn<FormSchema, any>) {
    const statePath = field.statePath as Path<FormSchema>;
    const { error } = getFieldState(statePath);
    const { ref, ...registerProps } = register(statePath, {});

    return (
        <PasswordInput
            allowShowPassword={field.allowShowPassword ?? true}
            required={field.required}
            placeholder={field.placeholder}
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
