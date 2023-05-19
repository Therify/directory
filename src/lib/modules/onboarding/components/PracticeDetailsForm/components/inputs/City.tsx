import { Control, Controller } from 'react-hook-form';
import { Input, FormValidation } from '@/lib/shared/components/ui';
import { HandlePracticeOnboarding } from '@/lib/modules/onboarding/features';

interface CityInputProps {
    control: Control<HandlePracticeOnboarding.Input>;
    defaultValue?: string;
    onInputBlur: () => void;
    disabled?: boolean;
}

export const CityInput = ({
    control,
    defaultValue = '',
    onInputBlur,
    disabled,
}: CityInputProps) => (
    <Controller
        control={control}
        name="city"
        defaultValue={defaultValue}
        rules={{
            required: true,
        }}
        render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error, isTouched },
        }) => (
            <Input
                autoComplete="nope"
                required
                fullWidth
                id="city"
                placeholder="City *"
                errorMessage={
                    isTouched
                        ? FormValidation.getNameValidationErrorMessage(
                              error?.type as FormValidation.NameValidationType,
                              'City'
                          )
                        : undefined
                }
                onBlur={(e) => {
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
