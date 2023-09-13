import { FieldValues, UseFormReturn } from 'react-hook-form';
import { PasswordInput } from '@/lib/shared/components/ui';
import { PasswordInput as PasswordFieldType } from '../types';

export function PasswordField<T extends FieldValues>({
    register,
    getFieldState,
    field,
}: {
    field: PasswordFieldType<T>;
} & UseFormReturn<T, any>) {
    const { error } = getFieldState(field.statePath);
    const { ref, ...registerProps } = register(field.statePath, {});

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
