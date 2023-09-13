import { Path, PathValue, UseFormReturn, FieldValues } from 'react-hook-form';
import { Select, SelectOption } from '@/lib/shared/components/ui';
import { SelectInput } from '../types';

export function SelectField<T extends FieldValues>({
    register,
    getFieldState,
    watch,
    setValue,
    field,
}: {
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
    const value = watch(field.statePath);
    const { error } = getFieldState(field.statePath);
    const { ref, onChange, ...registerProps } = register(field.statePath, {
        ...(field.required && { required: 'Field is required' }),
    });

    return (
        <Select
            required={field.required}
            id={field.id}
            label={field.label}
            helperText={field.helperText}
            errorMessage={error?.message}
            inputRef={ref}
            options={options}
            value={value}
            fullWidth
            placeholder={field.placeholder}
            onChange={(value) => {
                setValue(field.statePath, value as PathValue<T, Path<T>>);
            }}
            {...registerProps}
            wrapperSx={{
                width: '100%',
            }}
        />
    );
}
