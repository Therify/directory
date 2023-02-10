import { Control, Controller } from 'react-hook-form';
import { Input, FormValidation } from '@/components/ui';
import { ProviderProfile } from '@/lib/types/providerProfile';

interface MaximumRateInputProps {
    control: Control<ProviderProfile>;
    minimumRate?: number;
    disabled?: boolean;
    visible?: boolean;
}

export const MaximumRateInput = ({
    control,
    minimumRate = 0,
    disabled,
    visible,
}: MaximumRateInputProps) => {
    const minimumAcceptableRate = minimumRate + 5;
    return (
        <Controller
            control={control}
            name="maximumRate"
            rules={{
                min: visible ? minimumAcceptableRate : undefined,
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
                    wrapperSx={!visible ? { display: 'none' } : undefined}
                />
            )}
        />
    );
};
