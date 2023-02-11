import { Control, Controller } from 'react-hook-form';
import { Input } from '@/lib/shared/components/ui';
import { ProviderProfile } from '@/lib/shared/types';

interface InputProps {
    control: Control<ProviderProfile.ProviderProfile>;
    defaultValue?: string;
    disabled?: boolean;
}

export const LicenseNumberInput = ({
    control,
    defaultValue = '',
    disabled,
}: InputProps) => (
    <Controller
        control={control}
        name="supervisor.supervisorLicense.licenseNumber"
        defaultValue={defaultValue}
        rules={{
            required: true,
        }}
        render={({ field: { onChange, onBlur, value, name } }) => (
            <Input
                required
                label="License Number"
                fullWidth
                id="licenseNumber"
                placeholder="Supervisor License Number"
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
