import { Control, Controller } from 'react-hook-form';
import { Input, FormValidation } from '@/components/ui';
import { ProviderProfile } from '@/lib/types/providerProfile';

interface MaximumRateInputProps {
    control: Control<ProviderProfile>;
    defaultValue?: number;
    minimumRate?: number;
}

export const MaximumRateInput = ({
    control,
    defaultValue,
    minimumRate = 0,
}: MaximumRateInputProps) => (
    <Controller
        control={control}
        name="maximumRate"
        defaultValue={defaultValue}
        rules={{
            required: true,
            min: minimumRate,
        }}
        render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error, isTouched },
        }) => (
            <Input
                fullWidth
                type="number"
                id="maximumRate"
                label="Maximum Rate"
                errorMessage={
                    isTouched
                        ? FormValidation.Number.getNumberValidationErrorMessage(
                              error?.type as FormValidation.Number.NumberValidationType,
                              {
                                  fieldName: 'Rate',
                                  greaterThanThreshold: minimumRate,
                              }
                          )
                        : undefined
                }
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
