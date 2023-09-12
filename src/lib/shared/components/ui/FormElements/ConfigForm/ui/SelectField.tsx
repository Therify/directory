import { z } from 'zod';
import { Path, PathValue, UseFormReturn } from 'react-hook-form';
import { Select, SelectOption } from '@/lib/shared/components/ui';
import { SelectInput } from '../types';

export function SelectField<FormSchema extends z.ZodTypeAny>({
    register,
    getFieldState,
    watch,
    setValue,
    field,
}: {
    field: SelectInput;
} & UseFormReturn<FormSchema, any>) {
    const options: SelectOption[] = field.options.map((option) => {
        if (typeof option === 'string') {
            return {
                displayText: option,
                value: option,
            };
        }
        return option;
    });
    const statePath = field.statePath as Path<FormSchema>;
    const value = watch(statePath);
    const { error } = getFieldState(statePath);
    const { ref, onChange, ...registerProps } = register(statePath, {
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
                setValue(
                    statePath,
                    value as PathValue<FormSchema, Path<FormSchema>>
                );
            }}
            {...registerProps}
            wrapperSx={{
                width: '100%',
            }}
        />
    );
}
