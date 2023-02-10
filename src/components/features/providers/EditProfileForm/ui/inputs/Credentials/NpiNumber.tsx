import { Control, Controller } from 'react-hook-form';
import { Input } from '@/components/ui';
import { ProviderProfile } from '@/lib/types';

interface NpiNumberInputProps {
    control: Control<ProviderProfile.ProviderProfile>;
    disabled?: boolean;
}

export const NpiNumberInput = ({ control, disabled }: NpiNumberInputProps) => (
    <Controller
        control={control}
        name="npiNumber"
        defaultValue=""
        render={({ field: { onChange, onBlur, value, name } }) => (
            <Input
                fullWidth
                helperText="This is for our records. This will not be displayed on your profile."
                id="npiNumber"
                label="NPI Number"
                {...{
                    onChange,
                    onBlur,
                    value,
                    name,
                    disabled,
                }}
            />
        )}
    />
);
