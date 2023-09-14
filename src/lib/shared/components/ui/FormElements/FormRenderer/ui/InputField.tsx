import { Controller, FieldValues, UseFormReturn } from 'react-hook-form';
import { Input } from '@/lib/shared/components/ui';
import { Input as InputType } from '../types';

export function InputField<T extends FieldValues>({
    control,
    field,
    isLoading,
}: {
    field: InputType<T>;
    isLoading: boolean;
} & UseFormReturn<T, any>) {
    return (
        <Controller
            control={control}
            name={field.statePath}
            render={({
                field: { onChange, onBlur, value, name },
                fieldState: { error },
            }) => (
                <Input
                    fullWidth
                    disabled={isLoading}
                    required={field.required}
                    type={field.inputType ?? 'text'}
                    id={field.id}
                    label={field.label}
                    placeholder={field.placeholder}
                    helperText={field.helperText}
                    errorMessage={error?.message}
                    autoComplete={field.autoComplete}
                    onChange={(e) => {
                        if (field.inputType === 'number') {
                            return onChange({
                                target: { value: parseFloat(e.target.value) },
                            });
                        }
                        onChange(e);
                    }}
                    {...{
                        onBlur,
                        value,
                        name,
                    }}
                />
            )}
        />
    );
}
