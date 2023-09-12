import { z } from 'zod';
import { Path, UseFormReturn } from 'react-hook-form';
import { Input } from '@/lib/shared/components/ui';
import { Input as InputType } from '../types';

export function InputField<FormSchema extends z.ZodTypeAny>({
    register,
    getFieldState,
    field,
}: {
    field: InputType;
} & UseFormReturn<FormSchema, any>) {
    const statePath = field.statePath as Path<FormSchema>;
    const { error } = getFieldState(statePath);
    const { ref, ...registerProps } = register(statePath, {
        ...(field.type === 'number' && { valueAsNumber: true }),
    });

    return (
        <Input
            required={field.required}
            type={field.type ?? 'text'}
            id={field.id}
            label={field.label}
            placeholder={field.placeholder}
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
