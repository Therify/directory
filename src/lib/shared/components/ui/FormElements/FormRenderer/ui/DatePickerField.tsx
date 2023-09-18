import { UseFormReturn, FieldValues, Controller } from 'react-hook-form';
import { DatePicker } from '@/lib/shared/components/ui';
import { DatePickerInput } from '../types';

export function DatePickerField<T extends FieldValues>({
    control,
    field,
    isLoading,
}: {
    isLoading: boolean;
    field: DatePickerInput<T>;
} & UseFormReturn<T, any>) {
    return (
        <Controller
            control={control}
            name={field.statePath}
            render={({
                field: { onChange, onBlur, value, name },
                fieldState: { error },
            }) => (
                <DatePicker
                    required={field.required}
                    id={field.id}
                    label={field.label}
                    helperText={field.helperText}
                    errorMessage={error?.message}
                    disabled={isLoading}
                    onChange={(date) => {
                        if (date === null) return onChange(undefined);
                        onChange(date);
                    }}
                    value={new Date(value)}
                    {...{
                        onBlur,
                        name,
                    }}
                />
            )}
        />
    );
}
