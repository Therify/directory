import { Control, Controller } from 'react-hook-form';
import { Checkbox } from '@/lib/shared/components/ui';
import { ProviderProfile } from '@/lib/shared/types';

interface ToggleInputProps {
    control: Control<ProviderProfile.ProviderProfile>;
    disabled?: boolean;
}

export const IsMultiracialToggle = ({
    control,
    disabled,
}: ToggleInputProps) => (
    <Controller
        control={control}
        name="isMultiracial"
        defaultValue={false}
        render={({ field: { onChange, onBlur, value, name } }) => (
            <Checkbox
                id="isMultiracial"
                displayText="I identify as multiracial"
                {...{
                    disabled,
                    onChange,
                    onBlur,
                    value,
                    checked: value,
                    name,
                }}
            />
        )}
    />
);
