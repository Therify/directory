import { Control, Controller } from 'react-hook-form';
import { Input, FormValidation } from '@/lib/shared/components/ui';
import { HandlePracticeOnboarding } from '@/lib/modules/onboarding/features';

interface StreetAddressInputProps {
    control: Control<HandlePracticeOnboarding.Input>;
    defaultValue?: string;
    onInputBlur: () => void;
    disabled?: boolean;
}

export const StreetAddressInput = ({
    control,
    defaultValue = '',
    onInputBlur,
    disabled,
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
                autoComplete="off"
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
                    disabled,
                }}
            />
        )}
    />
);
