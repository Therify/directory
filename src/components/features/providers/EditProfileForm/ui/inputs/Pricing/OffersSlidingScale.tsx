import { Control, Controller } from 'react-hook-form';
import { Switch } from '@/components/ui';
import { ProviderProfile } from '@/lib/types';

interface ToggleInputProps {
    control: Control<ProviderProfile.ProviderProfile>;
    disabled?: boolean;
}

export const OffersSlidingScaleToggle = ({
    control,
    disabled,
}: ToggleInputProps) => (
    <Controller
        control={control}
        name="offersSlidingScale"
        render={({ field: { onChange, onBlur, value, name } }) => (
            <Switch
                id="offersSlidingScale"
                displayText="Offer sliding scale?"
                {...{ disabled, onChange, checked: value, onBlur, value, name }}
            />
        )}
    />
);
