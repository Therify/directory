import { Control, Controller } from 'react-hook-form';
import { Input, FormValidation } from '@/components/ui';
import { HandlePracticeOnboarding } from '@/lib/features/onboarding';

interface StreetAddressInputProps {
    control: Control<HandlePracticeOnboarding.Input>;
    defaultValue?: string;
    onInputBlur: () => void;
}

export const StreetAddressInput = ({
    control,
    defaultValue = '',
    onInputBlur,
}: StreetAddressInputProps) => (
    <Controller
        control={control}
        name="address"
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
                id="name"
                placeholder="Address *"
                errorMessage={
                    isTouched
                        ? FormValidation.getNameValidationErrorMessage(
                              error?.type as FormValidation.NameValidationType,
                              'Street name'
                          )
                        : undefined
                }
                onBlur={() => {
                    onBlur();
                    onInputBlur();
                }}
                {...{
                    onChange,
                    value,
                    name,
                }}
            />
        )}
    />
);
