import { Control, Controller } from 'react-hook-form';
import { Input, FormValidation } from '@/lib/shared/components/ui';
import { ProviderProfile } from '@/lib/shared/types';

interface GivenNameInputProps {
    control: Control<ProviderProfile.ProviderProfile>;
    disabled?: boolean;
}

export const GivenNameInput = ({ control, disabled }: GivenNameInputProps) => (
    <Controller
        control={control}
        name="givenName"
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
                id="givenName"
                label="First Name"
                errorMessage={
                    isTouched
                        ? FormValidation.getNameValidationErrorMessage(
                              error?.type as FormValidation.NameValidationType,
                              'First Name'
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
