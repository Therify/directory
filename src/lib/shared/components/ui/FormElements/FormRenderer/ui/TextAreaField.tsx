import { UseFormReturn, FieldValues } from 'react-hook-form';
import { Textarea } from '@/lib/shared/components/ui';
import { TextAreaInput } from '../types';

export function TextAreaField<T extends FieldValues>({
    register,
    getFieldState,
    field,
}: {
    field: TextAreaInput<T>;
} & UseFormReturn<T, any>) {
    const { error } = getFieldState(field.statePath);
    const { ref, ...registerProps } = register(field.statePath, {});

    return (
        <Textarea
            required={field.required}
            id={field.id}
            label={field.label}
            helperText={field.helperText}
            placeholder={field.placeholder}
            errorMessage={error?.message}
            inputRef={ref}
            {...registerProps}
            wrapperSx={{
                width: '100%',
            }}
        />
    );
}
