import { Control, Controller } from 'react-hook-form';
import { Input } from '@/lib/shared/components/ui';
import { ProviderProfile } from '@/lib/shared/types';

interface NpiNumberInputProps {
    control: Control<ProviderProfile.ProviderProfile>;
    disabled?: boolean;
}

export const NpiNumberInput = ({ control, disabled }: NpiNumberInputProps) => (
    <Controller
        control={control}
        name="supervisor.npiNumber"
        defaultValue=""
        render={({ field: { onChange, onBlur, value, name } }) => (
            <Input
                fullWidth
                id="npiNumber"
                label="NPI Number"
                placeholder="Supervisor NPI Number"
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
