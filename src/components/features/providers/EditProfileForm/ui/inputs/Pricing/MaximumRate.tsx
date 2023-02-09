import { Control, Controller } from 'react-hook-form';
import { Input, FormValidation } from '@/components/ui';
import { ProviderProfile } from '@/lib/types/providerProfile';

interface MaximumRateInputProps {
    control: Control<ProviderProfile>;
    defaultValue?: number;
    minimumRate?: number;
    disabled?: boolean;
}

export const MaximumRateInput = ({
    control,
    defaultValue,
    minimumRate = 0,
    disabled,
}: MaximumRateInputProps) => {
    const minimumAcceptableRate = minimumRate + 5;
    return (
        <Controller
            control={control}
            name="maximumRate"
            defaultValue={defaultValue ?? minimumRate + 40}
            rules={{
                required: true,
                min: minimumAcceptableRate,
            }}
            render={({
                field: { onChange, onBlur, value, name },
                fieldState: { error },
            }) => (
                <Input
                    fullWidth
                    type="number"
                    id="maximumRate"
                    label="Maximum Rate"
                    errorMessage={FormValidation.Number.getNumberValidationErrorMessage(
                        error?.type as FormValidation.Number.NumberValidationType,
                        {
                            fieldName: 'Rate',
                            greaterThanThreshold: minimumAcceptableRate,
                        }
                    )}
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
};
