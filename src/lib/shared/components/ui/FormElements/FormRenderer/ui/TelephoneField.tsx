import {
    Controller,
    FieldValues,
    Path,
    PathValue,
    UseFormReturn,
} from 'react-hook-form';
import { MaskedInput } from '@/lib/shared/components/ui';
import { TelephoneInput } from '../types';
import {
    cleanPhoneNumber,
    getTelephoneMask,
} from '../../form-validation/phone';

export function TelephoneField<T extends FieldValues>({
    control,
    field,
    isLoading,
}: {
    field: TelephoneInput<T>;
    isLoading: boolean;
} & UseFormReturn<T, any>) {
    return (
        <Controller
            control={control}
            name={field.statePath}
            defaultValue={'' as PathValue<T, Path<T>>}
            render={({
                field: { onChange, onBlur, value, name },
                fieldState: { error },
            }) => (
                <MaskedInput
                    mask={getTelephoneMask(field.format ?? 'US')}
                    maskPlaceholderCharacter={field.maskPlaceholderCharacter}
                    fullWidth
                    disabled={isLoading}
                    required={field.required}
                    type="tel"
                    id={field.id}
                    label={field.label}
                    placeholder={field.placeholder}
                    helperText={field.helperText}
                    errorMessage={error?.message}
                    autoComplete={field.autoComplete}
                    onChange={(e) => {
                        return onChange({
                            target: {
                                value: cleanPhoneNumber(e.target.value),
                            },
                        });
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
