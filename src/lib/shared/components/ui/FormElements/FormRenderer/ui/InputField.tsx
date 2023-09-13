import { FieldValues, UseFormReturn } from 'react-hook-form';
import { Input } from '@/lib/shared/components/ui';
import { Input as InputType } from '../types';

export function InputField<T extends FieldValues>({
    register,
    getFieldState,
    field,
}: {
    field: InputType<T>;
} & UseFormReturn<T, any>) {
    const { error } = getFieldState(field.statePath);
    const { ref, ...registerProps } = register(field.statePath, {
        ...(field.inputType === 'number' && { valueAsNumber: true }),
    });

    return (
        <Input
            required={field.required}
            type={field.inputType ?? 'text'}
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
