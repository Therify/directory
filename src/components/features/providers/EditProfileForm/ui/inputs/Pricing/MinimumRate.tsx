import { Control, Controller } from 'react-hook-form';
import { Input, FormValidation } from '@/components/ui';
import { ProviderProfile } from '@/lib/types/providerProfile';

interface MinimumRateInputProps {
    control: Control<ProviderProfile>;
    defaultValue?: number;
    label: string;
}

export const MinimumRateInput = ({
    control,
    label,
    defaultValue = 0,
}: MinimumRateInputProps) => (
    <Controller
        control={control}
        name="minimumRate"
        defaultValue={defaultValue}
        rules={{
            required: true,
            min: 0,
            max: 1000,
        }}
        render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error, isTouched },
        }) => (
            <Input
                fullWidth
                type="number"
                id="minimumRate"
                errorMessage={
                    isTouched
                        ? FormValidation.Number.getNumberValidationErrorMessage(
                              error?.type as FormValidation.Number.NumberValidationType,
                              { fieldName: 'Rate' }
                          )
                        : undefined
                }
                {...{
                    label,
                    onChange,
                    onBlur,
                    value,
                    name,
                }}
            />
        )}
    />
);
