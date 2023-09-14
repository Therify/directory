import { Controller, FieldValues, UseFormReturn } from 'react-hook-form';
import { PasswordInput } from '@/lib/shared/components/ui';
import { PasswordInput as PasswordFieldType } from '../types';

export function PasswordField<T extends FieldValues>({
    field,
    isLoading,
    control,
}: {
    isLoading: boolean;
    field: PasswordFieldType<T>;
} & UseFormReturn<T, any>) {
    return (
        <Controller
            control={control}
            name={field.statePath}
            render={({
                field: { onChange, onBlur, value, name },
                fieldState: { error },
            }) => (
                <PasswordInput
                    fullWidth
                    disabled={isLoading}
                    required={field.required}
                    id={field.id}
                    label={field.label}
                    placeholder={field.placeholder}
                    helperText={field.helperText}
                    errorMessage={error?.message}
                    {...{
                        onChange,
                        onBlur,
                        value,
                        name,
                    }}
                />
            )}
        />
    );
}
