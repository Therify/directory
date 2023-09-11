import { z } from 'zod';
import { Path, PathValue, UseFormReturn } from 'react-hook-form';
import { Select, SelectOption } from '@/lib/shared/components/ui';
import { SelectInput } from '../types';

export function SelectField<FormSchema extends z.ZodType>({
    register,
    getFieldState,
    watch,
    setValue,
    field,
}: {
    field: SelectInput<FormSchema>;
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
    const statePath = field.statePath;
    const value = watch(statePath);
    const { error } = getFieldState(statePath);
    const { ref, onChange, ...registerProps } = register(statePath, {
        ...field.validation,
        required:
            (field.required && field.validation?.required) ??
            'Field is required.',
    });
    console.log({ value });
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
