import { Control, Controller } from 'react-hook-form';
import { Switch } from '@/components/ui';
import { ProviderProfile } from '@/lib/types/providerProfile';

interface ToggleInputProps {
    control: Control<ProviderProfile>;
    defaultValue?: boolean;
    disabled?: boolean;
}

export const OffersSlidingScaleToggle = ({
    control,
    defaultValue = false,
    disabled,
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
                {...{ disabled, onChange, onBlur, value, name }}
            />
        )}
    />
);
