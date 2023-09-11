import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/lib/shared/components/ui';
import { Input as InputType } from '../types';

export function InputField<FormSchema extends z.ZodType, T>({
    register,
    getFieldState,
    field,
}: {
    field: InputType<T>;
} & UseFormReturn<FormSchema, any>) {
    const statePath = field.statePath;
    const { error } = getFieldState(statePath);
    const { ref, ...registerProps } = register(statePath, {
        ...field.validation,
        required:
            (field.required && field.validation?.required) ??
            'Field is required.',
        ...(field.type === 'number' && { valueAsNumber: true }),
    });

    return (
        <Input
            required={field.required}
            type={field.type ?? 'text'}
            id={field.id}
            label={field.label}
            helperText={field.helperText}
            errorMessage={error?.message}
            autoComplete={field.autoComplete}
            inputRef={ref}
            {...registerProps}
            wrapperSx={{
                width: '100%',
            }}
        />
    );
}
