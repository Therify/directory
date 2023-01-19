import { Control, Controller } from 'react-hook-form';
import { Input, FormValidation } from '@/components/ui';
import { HandlePracticeOnboarding } from '@/lib/features/onboarding';

interface CityInputProps {
    control: Control<HandlePracticeOnboarding.Input>;
    defaultValue?: string;
    onInputBlur: () => void;
}

export const CityInput = ({
    control,
    defaultValue = '',
    onInputBlur,
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
                }}
            />
        )}
    />
);
