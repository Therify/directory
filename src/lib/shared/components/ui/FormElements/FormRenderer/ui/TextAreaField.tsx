import {
    UseFormReturn,
    FieldValues,
    Controller,
} from 'react-hook-form';
import { Textarea } from '@/lib/shared/components/ui';
import { TextAreaInput } from '../types';

export function TextAreaField<T extends FieldValues>({
    control,
    field,
    isLoading,
}: {
    isLoading: boolean;
    field: TextAreaInput<T>;
} & UseFormReturn<T, any>) {
    return (
        <Controller
            control={control}
            name={field.statePath}
            render={({
                field: { onChange, onBlur, value, name },
                fieldState: { error },
            }) => (
                <Textarea
                    id={field.id}
                    defaultValue=""
                    fullWidth
                    disabled={isLoading}
                    required={field.required}
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
