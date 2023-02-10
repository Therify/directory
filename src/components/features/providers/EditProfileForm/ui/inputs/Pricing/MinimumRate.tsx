import { Control, Controller } from 'react-hook-form';
import { Input, FormValidation } from '@/components/ui';
import { ProviderProfile } from '@/lib/types/providerProfile';

interface MinimumRateInputProps {
    control: Control<ProviderProfile>;
    label: string;
    disabled?: boolean;
}

export const MinimumRateInput = ({
    control,
    label,
    disabled,
}: MinimumRateInputProps) => (
    <Controller
        control={control}
        name="minimumRate"
        rules={{
            required: true,
            min: 0,
            max: 1000,
        }}
        render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error },
        }) => (
            <Input
                required
                fullWidth
                type="number"
                id="minimumRate"
                errorMessage={FormValidation.Number.getNumberValidationErrorMessage(
                    error?.type as FormValidation.Number.NumberValidationType,
                    {
                        fieldName: 'Rate',
                        greaterThanThreshold: 0,
                    }
                )}
                {...{
                    disabled,
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
