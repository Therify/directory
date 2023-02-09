import { Control, Controller } from 'react-hook-form';
import { Input, FormValidation } from '@/components/ui';
import { TEST_IDS } from './testIds';
import { ProviderProfile } from '@/lib/types/providerProfile';

interface SurnameInputProps {
    control: Control<ProviderProfile>;
    defaultValue?: string;
}

export const SurnameInput = ({
    control,
    defaultValue = '',
}: SurnameInputProps) => (
    <Controller
        control={control}
        name="surname"
        defaultValue={defaultValue}
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
                autoComplete="last-name"
                data-testid={TEST_IDS.LAST_NAME}
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
