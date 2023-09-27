import { UseFormReturn, FieldValues, Controller } from 'react-hook-form';
import { RadioSelect, Select, SelectOption } from '@/lib/shared/components/ui';
import { RadioSelectInput } from '../types';

export function RadioSelectField<T extends FieldValues>({
    control,
    field,
    isLoading,
}: {
    isLoading: boolean;
    field: RadioSelectInput<T>;
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
            defaultValue={field.defaultValue}
            render={({
                field: { onChange, onBlur, value, name },
                fieldState: { error },
            }) => (
                <RadioSelect
                    required={field.required}
                    id={field.id}
                    label={field.label}
                    disabled={isLoading}
                    value={value}
                    fullWidth
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
