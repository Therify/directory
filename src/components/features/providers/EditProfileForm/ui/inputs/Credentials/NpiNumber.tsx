import { Control, Controller } from 'react-hook-form';
import { Input } from '@/components/ui';
import { ProviderProfile } from '@/lib/types/providerProfile';

interface NpiNumberInputProps {
    control: Control<ProviderProfile>;
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
