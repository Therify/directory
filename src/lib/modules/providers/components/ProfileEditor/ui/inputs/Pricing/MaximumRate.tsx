import { Control, Controller } from 'react-hook-form';
import { Input, FormValidation } from '@/lib/shared/components/ui';
import { ProviderProfile } from '@/lib/shared/types';

interface MaximumRateInputProps {
    control: Control<ProviderProfile.ProviderProfile>;
    minimumRate?: number;
    disabled?: boolean;
}

export const MaximumRateInput = ({
    control,
    minimumRate = 0,
    disabled,
}: MaximumRateInputProps) => {
    const minimumAcceptableRate = minimumRate + 10;
    return (
        <Controller
            control={control}
            name="maximumRate"
            defaultValue={minimumRate}
            rules={{
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
                    onChange={(e) => {
                        onChange(parseInt(e.target.value));
                    }}
                    {...{
                        disabled,
                        onBlur,
                        value,
                        name,
                    }}
                />
            )}
        />
    );
};
