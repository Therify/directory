import { Control, Controller } from 'react-hook-form';
import { Input, FormValidation } from '@/lib/shared/components/ui';
import { ProviderProfile } from '@/lib/shared/types';

interface MinimumRateInputProps {
    control: Control<ProviderProfile.ProviderProfile>;
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
                onChange={(e) => {
                    onChange(parseInt(e.target.value));
                }}
                {...{
                    disabled,
                    label,
                    onBlur,
                    value,
                    name,
                }}
            />
        )}
    />
);
