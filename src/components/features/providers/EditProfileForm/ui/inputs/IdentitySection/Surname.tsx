import { Control, Controller } from 'react-hook-form';
import { Input, FormValidation } from '@/components/ui';
import { ProviderProfile } from '@/lib/types/providerProfile';

interface SurnameInputProps {
    control: Control<ProviderProfile>;
    disabled?: boolean;
}

export const SurnameInput = ({ control, disabled }: SurnameInputProps) => (
    <Controller
        control={control}
        name="surname"
        defaultValue=""
        rules={{
            required: true,
        }}
        render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error, isTouched },
        }) => (
            <Input
                required
                fullWidth
                id="surname"
                label="Last Name"
                errorMessage={
                    isTouched
                        ? FormValidation.getNameValidationErrorMessage(
                              error?.type as FormValidation.NameValidationType,
                              'Last Name'
                          )
                        : undefined
                }
                {...{
                    disabled,
                    onChange,
                    onBlur,
                    value,
                    name,
                }}
            />
        )}
    />
);
