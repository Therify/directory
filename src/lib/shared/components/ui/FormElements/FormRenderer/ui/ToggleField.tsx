import { UseFormReturn, FieldValues, Controller } from 'react-hook-form';
import { Toggle } from '@/lib/shared/components/ui';
import { ToggleInput } from '../types';

export function ToggleField<T extends FieldValues>({
    control,
    field,
    isLoading,
}: {
    isLoading: boolean;
    field: ToggleInput<T>;
} & UseFormReturn<T, any>) {
    return (
        <Controller
            control={control}
            name={field.statePath}
            render={({
                field: { onChange, onBlur, value, name },
            }) => (
                <Toggle
                    type={field.toggleType ?? 'checkbox'}
                    id={field.id}
                    displayText={field.label}
                    disabled={isLoading}
                    {...{
                        value,
                        onBlur,
                        onChange,
                        name,
                    }}
                />
            )}
        />
    );
}
