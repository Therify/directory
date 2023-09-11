import { z } from 'zod';
import { Path, UseFormReturn } from 'react-hook-form';
import { Textarea } from '@/lib/shared/components/ui';
import { TextAreaInput } from '../types';

export function TextAreaField<FormSchema extends z.ZodTypeAny>({
    register,
    getFieldState,
    field,
}: {
    field: TextAreaInput;
} & UseFormReturn<FormSchema, any>) {
    const statePath = field.statePath as Path<FormSchema>;
    const { error } = getFieldState(statePath);
    const { ref, ...registerProps } = register(statePath, {});

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
