import { Control, Controller } from 'react-hook-form';
import { Switch } from '@/components/ui';
import { ProviderProfile } from '@/lib/types/providerProfile';

interface ToggleInputProps {
    control: Control<ProviderProfile>;
    defaultValue?: boolean;
}

export const OffersSlidingScaleToggle = ({
    control,
    defaultValue = false,
}: ToggleInputProps) => (
    <Controller
        control={control}
        name="offersSlidingScale"
        defaultValue={defaultValue}
        rules={{
            required: true,
        }}
        render={({ field: { onChange, onBlur, value, name } }) => (
            <Switch
                id="offersSlidingScale"
                displayText="Offer sliding scale?"
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
