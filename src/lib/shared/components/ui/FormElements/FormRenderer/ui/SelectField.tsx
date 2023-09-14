import { UseFormReturn, FieldValues, Controller } from 'react-hook-form';
import { Select, SelectOption } from '@/lib/shared/components/ui';
import { SelectInput } from '../types';

export function SelectField<T extends FieldValues>({
    control,
    field,
    isLoading,
}: {
    isLoading: boolean;
    field: SelectInput<T>;
} & UseFormReturn<T, any>) {
    const options: SelectOption[] = field.options.map((option) => {
        if (typeof option === 'string') {
            return {
                displayText: option,
                value: option,
            };
        }
        return option;
    });
    return (
        <Controller
            control={control}
            name={field.statePath}
            render={({
                field: { onChange, onBlur, value, name },
                fieldState: { error },
            }) => (
                <Select
                    required={field.required}
                    id={field.id}
                    label={field.label}
                    helperText={field.helperText}
                    errorMessage={error?.message}
                    disabled={isLoading}
                    value={value}
                    fullWidth
                    placeholder={field.placeholder}
                    options={options}
                    {...{
                        onBlur,
                        onChange,
                        name,
                    }}
                />
            )}
        />
    );
}
