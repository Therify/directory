import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';
import { Textarea } from '@/lib/shared/components/ui';
import { TextAreaInput } from '../types';

export function TextAreaField<FormSchema extends z.ZodType>({
    register,
    getFieldState,
    field,
}: {
    field: TextAreaInput<FormSchema>;
} & UseFormReturn<FormSchema, any>) {
    const statePath = field.statePath;
    const { error } = getFieldState(statePath);
    const { ref, ...registerProps } = register(statePath, {
        ...field.validation,
        required:
            (field.required && field.validation?.required) ??
            'Field is required.',
    });

    return (
        <Textarea
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
