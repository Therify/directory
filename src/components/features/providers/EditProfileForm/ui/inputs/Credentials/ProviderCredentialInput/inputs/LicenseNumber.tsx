import { Control, Controller } from 'react-hook-form';
import { Input, FormValidation } from '@/components/ui';
import { ProviderCredential } from '@/lib/types';

interface InputProps {
    control: Control<ProviderCredential.ProviderCredential>;
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
        name="licenseNumber"
        defaultValue={defaultValue}
        rules={{
            required: true,
        }}
        render={({ field: { onChange, onBlur, value, name } }) => (
            <Input
                label="License Number"
                fullWidth
                id="licenseNumber"
                placeholder="License Number"
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
